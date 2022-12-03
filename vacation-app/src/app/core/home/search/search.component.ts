import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  constructor(private router: Router) {}

  searchHandler(searchForm: NgForm) {
    if (searchForm.invalid) {
      return;
    }

    const search: string = searchForm.controls['search'].value;

    this.router.navigate(['/offers'], { queryParams: { search } });
  }
}
