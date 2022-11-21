import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, Subscription } from 'rxjs';
import { OfferService } from '../../offer.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit, OnDestroy {
  readonly rates = [1, 2, 3, 4, 5];

  @Input() reviewContainer!: HTMLElement;
  @Input() offerId!: string;

  reviewForm!: FormGroup;

  subscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private offerService: OfferService,
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
    if (this.reviewContainer.style.display == 'none') {
      return;
    }

    if (this.reviewForm.invalid) {
      return this.reviewForm.markAllAsTouched();
    }

    const body = this.reviewForm.value;
    console.log(body);

    this.subscription = this.offerService
      .addReview$(body, this.offerId)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.closeReviewContainer();
        },
        error: (err) => {
          console.log(err);
          this.closeReviewContainer();
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
    this.reviewContainer.style.display = 'none';
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
