import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { MessageBusService } from 'src/app/message-bus.service';
import { OfferService } from 'src/app/offer/offer.service';
import { MessageType } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-edit-delete-btns',
  templateUrl: './edit-delete-btns.component.html',
  styleUrls: ['./edit-delete-btns.component.css'],
})
export class EditDeleteBtnsComponent implements OnDestroy {
  @Input() offerId!: string;

  isLoading = false;

  subscription$!: Subscription;

  constructor(
    private offerService: OfferService,
    private router: Router,
    private messageBus: MessageBusService
  ) {}

  deleteHandler(): void {
    this.isLoading = true;

    this.subscription$ = this.offerService
      .deleteOffer$(this.offerId)
      .subscribe({
        next: () => {
          this.messageBus.addMessage({
            message: 'Successfully deleted!',
            type: MessageType.Success,
          });

          this.router.navigate(['/']);
        },
        error: (err) => {
          this.router.navigate(['/']);
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }
}
