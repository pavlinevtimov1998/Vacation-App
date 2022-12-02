import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input() pages: number = 1;

  @Output() sendCurrentPage = new EventEmitter<number>();

  displayedBtns = 3;

  canClick = true;

  currentPage = 1;

  constructor() {}

  ngOnInit(): void {}

  previousPage() {
    if (this.currentPage > 1 && this.canClick) {
      this.currentPage--;
      this.sendCurrentPage.emit(this.currentPage);
    }
  }

  nextPage() {
    if (this.currentPage < this.pages && this.canClick) {
      this.currentPage++;
      this.sendCurrentPage.emit(this.currentPage);
    }
  }

  rowClickHandler(page: number) {
    if (this.canClick) {
      this.currentPage = page;
      this.sendCurrentPage.emit(this.currentPage);
    }
  }
}
