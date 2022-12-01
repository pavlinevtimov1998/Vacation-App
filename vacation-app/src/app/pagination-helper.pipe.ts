import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginationHelper',
})
export class PaginationHelperPipe implements PipeTransform {
  transform(value: number): number[] {
    const arr = [];

    for (let i = 1; i <= value; i++) {
      arr.push(i);
    }

    return arr;
  }
}
