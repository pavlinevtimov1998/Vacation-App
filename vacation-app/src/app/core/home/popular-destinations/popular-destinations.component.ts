import { Component, Input, OnInit } from '@angular/core';
import { createFind } from 'rxjs/internal/operators/find';
import { IOffer } from 'src/app/shared/interfaces/offer.interface';

@Component({
  selector: 'app-popular-destinations',
  templateUrl: './popular-destinations.component.html',
  styleUrls: ['./popular-destinations.component.css'],
})
export class PopularDestinationsComponent implements OnInit {
  @Input() topDestinations!: IOffer[];

  selectedIndex = 0;

  constructor() {}

  ngOnInit(): void {}

  leftArrowHandler(): void {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
    } else {
      this.selectedIndex = this.topDestinations.length - 1;
    }
  }

  rightArrowHandler(): void {
    if (this.selectedIndex < this.topDestinations.length - 1) {
      this.selectedIndex++;
    } else {
      this.selectedIndex = 0;
    }
  }
}
