import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { IOffer } from 'src/app/shared/interfaces/offer.interface';
import { WelcomeService } from '../../welcome.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() carouselData!: IOffer[];

  selectedIndex = 0;
  interval: any;

  constructor() {}

  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.rightArrowHandler();
    }, 5000);
  }

  onDotClick(index: number) {
    this.selectedIndex = index;
  }

  leftArrowHandler(): void {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
    } else {
      this.selectedIndex = this.carouselData.length - 1;
    }
  }

  rightArrowHandler(): void {
    if (this.selectedIndex < this.carouselData.length - 1) {
      this.selectedIndex++;
    } else {
      this.selectedIndex = 0;
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
