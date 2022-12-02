import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  @Input() pages: number = 1;

  @Output() sendCurrentPage = new EventEmitter<number>();

  currentPage = 1;

  constructor() {}

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.sendCurrentPage.emit(this.currentPage);
    }
  }

  nextPage() {
    if (this.currentPage < this.pages) {
      this.currentPage++;
      this.sendCurrentPage.emit(this.currentPage);
    }
  }

  rowClickHandler(page: number) {
    this.currentPage = page;
    this.sendCurrentPage.emit(this.currentPage);
  }
}
