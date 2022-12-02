import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input() pages: number = 1;

  @Output() sendCurrentPage = new EventEmitter<number>();

  displayedBtns!: number;
  currentPage = 1;

  constructor() {}

  ngOnInit(): void {
    if (this.pages >= 5) {
      this.displayedBtns = 5;
    } else {
      this.displayedBtns = this.pages;
    }
  }

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
