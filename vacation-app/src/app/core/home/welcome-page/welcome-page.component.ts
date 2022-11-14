import { Component, OnInit } from '@angular/core';
import { IOffer } from 'src/app/shared/interfaces/offer.interface';
import { WelcomeService } from '../../welcome.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
})
export class WelcomePageComponent implements OnInit {
  carouselData!: IOffer[];

  constructor(private welcomeService: WelcomeService) {}

  ngOnInit(): void {
    this.welcomeService.getCarouselData().subscribe({
      next: (data) => {
        this.carouselData = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
