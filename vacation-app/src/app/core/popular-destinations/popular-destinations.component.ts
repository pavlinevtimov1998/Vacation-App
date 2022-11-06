import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popular-destinations',
  templateUrl: './popular-destinations.component.html',
  styleUrls: ['./popular-destinations.component.css'],
})
export class PopularDestinationsComponent implements OnInit {
  images = [
    {
      imageUrl: '/assets/img/vacation.jpg',
      alt: 'vacation',
    },
    {
      imageUrl: '/assets/img/vacation2.jpg',
      alt: 'vacation',
    },
    {
      imageUrl: '/assets/img/vacation.jpg',
      alt: 'vacation',
    },
    {
      imageUrl: '/assets/img/vacation2.jpg',
      alt: 'vacation',
    },
    {
      imageUrl: '/assets/img/vacation.jpg',
      alt: 'vacation',
    },
    {
      imageUrl: '/assets/img/vacation2.jpg',
      alt: 'vacation',
    },
    {
      imageUrl: '/assets/img/vacation.jpg',
      alt: 'vacation',
    },
    {
      imageUrl: '/assets/img/vacation2.jpg',
      alt: 'vacation',
    },
    {
      imageUrl: '/assets/img/vacation.jpg',
      alt: 'vacation',
    },
  ];
  currentImages = this.images.slice(0, 1);

  index = 0;
  dotIndex = 0;
  interval: any;

  constructor() {}

  ngOnInit(): void {}

  leftArrowHandler(): void {
    if (this.index > 0) {
      this.index--;
    }

    this.currentImages = this.images.slice(0 + this.index, 1 + this.index);
  }

  rightArrowHandler(): void {
    if (this.index < this.images.length - 1) {
      this.index++;
    }
    
    this.currentImages = this.images.slice(0 + this.index, 1 + this.index);
  }
}
