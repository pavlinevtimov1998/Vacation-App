import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { OfferService } from 'src/app/offer/offer.service';

@Component({
  selector: 'app-edit-delete-btns',
  templateUrl: './edit-delete-btns.component.html',
  styleUrls: ['./edit-delete-btns.component.css'],
})
export class EditDeleteBtnsComponent {
  @Input() offerId!: string;

  @Output() loading = new EventEmitter();

  constructor(private offerService: OfferService, private router: Router) {}

  deleteHandler(): void {
    this.loading.emit();
    this.offerService.deleteOffer$(this.offerId).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  editHandler() {
    this.router.navigate(['/']);
  }
}
