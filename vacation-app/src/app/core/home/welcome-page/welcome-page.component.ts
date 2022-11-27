import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, combineLatestAll, Subscription } from 'rxjs';
import { LoadingService } from 'src/app/loading.service';
import { ICountry } from 'src/app/shared/interfaces/country.interface';
import { IOffer } from 'src/app/shared/interfaces/offer.interface';
import { WelcomeService } from '../../welcome.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
})
export class WelcomePageComponent implements OnInit, OnDestroy {
  carouselData!: IOffer[];
  topCountries!: ICountry[];

  subscribtion$!: Subscription;

  get isLoading$() {
    return this.loadingService.isLoading$;
  }
  constructor(
    private welcomeService: WelcomeService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.subscribtion$ = combineLatest([
      this.welcomeService.getCarouselData$(),
      this.welcomeService.getTopCountries$(),
    ]).subscribe({
      next: ([carousel, countries]) => {
        this.carouselData = carousel;
        this.topCountries = countries;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy() {
    this.subscribtion$?.unsubscribe();
  }
}
