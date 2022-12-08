import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageBusService } from 'src/app/message-bus.service';
import { OfferService } from 'src/app/offer/offer.service';

import { IReview } from 'src/app/shared/interfaces';
import { MessageType } from 'src/app/shared/interfaces/message.interface';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit, OnDestroy {
  readonly rates = [1, 2, 3, 4, 5];

  @Input() offerId!: string;
  @Output() addedReview = new EventEmitter<IReview>();
  @Output() close = new EventEmitter();

  reviewForm!: FormGroup;

  isLoading = false;

  subscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private offerService: OfferService,
    private messageBus: MessageBusService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reviewForm = this.formBuilder.group({
      rating: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(5),
      ]),
      content: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100),
      ]),
    });
  }

  reviewHandler() {
    if (this.reviewForm.invalid) {
      return this.reviewForm.markAllAsTouched();
    }

    const body = this.reviewForm.value;
    this.isLoading = true;

    this.subscription = this.offerService
      .addReview$(body, this.offerId)
      .subscribe({
        next: (review) => {
          this.addedReview.emit(review);

          this.reviewForm.reset();

          this.messageBus.addMessage({
            message: 'Successfully added review!',
            type: MessageType.Success,
          });
          this.close.emit();
        },
        error: (err) => {
          this.router.navigate(['/']);
        },
      });
  }

  rateHandler(starsContainer: HTMLDivElement, index: number, rate: number) {
    for (let i = 0; i < starsContainer.children.length; i++) {
      if (i <= index) {
        starsContainer.children[i].textContent = 'star';
      } else {
        starsContainer.children[i].textContent = 'star_border';
      }
    }

    this.reviewForm.controls['rating'].patchValue(rate);
  }

  closeReviewContainer() {
    this.close.emit();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
