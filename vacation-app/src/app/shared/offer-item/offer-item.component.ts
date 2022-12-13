import { Component, Input } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';
import { IOffer } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.css'],
})
export class OfferItemComponent {
  @Input() offer!: IOffer;

  get currentUser$() {
    return this.authService.currentUser$;
  }

  get isLogged$() {
    return this.authService.isLogged$;
  }

  isLoading = false;

  constructor(private authService: AuthService) {}
}
