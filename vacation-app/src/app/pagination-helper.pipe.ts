import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginationHelper',
})
export class PaginationHelperPipe implements PipeTransform {
  transform(
    pages: number,
    displayedBtns: number,
    currentPage: number
  ): number[] {
    const arr = [];

    let minRows = currentPage - Math.floor(displayedBtns / 2);
    let maxRows = currentPage + Math.floor(displayedBtns / 2);

    if (minRows < 1) {
      minRows = 1;
      maxRows = displayedBtns;
    }

    if (maxRows > pages) {
      maxRows = pages;
      minRows = pages - (displayedBtns - 1);
    }

    for (let i = minRows; i <= maxRows; i++) {
      arr.push(i);
    }

    return arr;
  }
}
