import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { ICountry } from 'src/app/shared/interfaces';
import { IOffer } from 'src/app/shared/interfaces';
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

  get isLogged$() {
    return this.authService.isLogged$;
  }

  isLoading = true;

  constructor(
    private welcomeService: WelcomeService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscribtion$ = combineLatest([
      this.welcomeService.getCarouselData$(),
      this.welcomeService.getTopCountries$(),
    ]).subscribe({
      next: ([carouselData, countries]) => {
        this.carouselData = carouselData;
        this.topCountries = countries;
        this.isLoading = false;
      },
      error: (err) => {
        this.router.navigate(['/404']);
      },
    });
  }

  ngOnDestroy() {
    this.subscribtion$?.unsubscribe();
  }
}
