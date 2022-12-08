import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MessageBusService } from 'src/app/message-bus.service';

import { OfferService } from 'src/app/offer/offer.service';
import { MessageType } from 'src/app/shared/interfaces/message.interface';

@Component({
  selector: 'app-edit-delete-btns',
  templateUrl: './edit-delete-btns.component.html',
  styleUrls: ['./edit-delete-btns.component.css'],
})
export class EditDeleteBtnsComponent {
  @Input() offerId!: string;

  @Output() loading = new EventEmitter();

  constructor(
    private offerService: OfferService,
    private router: Router,
    private messageBus: MessageBusService
  ) {}

  deleteHandler(): void {
    this.loading.emit();
    this.offerService.deleteOffer$(this.offerId).subscribe({
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

  editHandler() {
    this.router.navigate(['/']);
  }
}
