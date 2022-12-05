import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OfferService } from '../../offer.service';

@Component({
  selector: 'app-edit-delete-btns',
  templateUrl: './edit-delete-btns.component.html',
  styleUrls: ['./edit-delete-btns.component.css'],
})
export class EditDeleteBtnsComponent {
  @Input() offerId!: string;

  @Output() loading = new EventEmitter<boolean>();

  constructor(private offerService: OfferService, private router: Router) {}

  deleteHandler(): void {
    this.loading.emit(true);
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
