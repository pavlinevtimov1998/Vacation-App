import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit, OnDestroy {
  images = [
    {
      imageUrl: '/assets/img/vacation.jpg',
      alt: 'vacation',
    },
    {
      imageUrl: '/assets/img/vacation2.jpg',
      alt: 'vacation',
    },
  ];

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
      this.selectedIndex = this.images.length - 1;
    }
  }

  rightArrowHandler(): void {
    if (this.selectedIndex < this.images.length - 1) {
      this.selectedIndex++;
    } else {
      this.selectedIndex = 0;
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
