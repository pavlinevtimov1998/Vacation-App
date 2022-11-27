import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth.service';
import { IOffer } from 'src/app/shared/interfaces/offer.interface';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.css'],
})
export class OfferItemComponent implements OnInit {
  @Input() offer!: IOffer;

  get currentUser$() {
    return this.authService.currentUser$;
  }

  get isLogged$() {
    return this.authService.isLogged$;
  }

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  routeHandler(event: Event) {
    if (
      (event.target as HTMLElement).tagName !== 'BUTTON' &&
      (event.target as HTMLElement).tagName !== 'MAT-ICON'
    ) {
      this.router.navigate([`/offers/${this.offer._id}`]);
    }
  }

  //TODO
  addToFavorite() {}

  //TODO
  removeFromFavorite() {}
}
