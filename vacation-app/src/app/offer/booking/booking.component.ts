import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, Subscription } from 'rxjs';
import { LoadingService } from 'src/app/loading.service';

import { IOffer } from 'src/app/shared/interfaces';
import { OfferService } from '../offer.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  offer!: IOffer;

  subscription!: Subscription;

  get startDate(): FormControl<Date | null> {
    return this.dateForm.controls['startDate'] as FormControl<Date | null>;
  }

  get endDate(): FormControl<Date | null> {
    return this.dateForm.controls['endDate'] as FormControl<Date | null>;
  }

  minDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() + 1
  );
  price: number = 0;
  dateError: boolean = false;
  dateForm!: FormGroup;

  get isLoading$() {
    return this.loadingService.isLoading$;
  }

  constructor(
    private offerService: OfferService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.dateForm = this.formBuilder.group({
      startDate: new FormControl<Date | null>({ value: null, disabled: true }, [
        Validators.required,
      ]),
      endDate: new FormControl<Date | null>({ value: null, disabled: true }, [
        Validators.required,
      ]),
    });

    this.getOffer();
  }

  dateFormHandler() {
    if (
      !this.startDate.value ||
      !this.endDate.value ||
      this.startDate.value < this.minDate
    ) {
      this.dateError = true;
      return;
    }

    const body = this.dateForm.value;
    body.agency = this.offer.agency._id;
    body.price = +this.price.toFixed(2);

    this.offerService.booking$(body, this.offer._id).subscribe({
      next: (response) => {
        this.router.navigate(['/payment-system']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  dateChangeHandler(event: MatDatepickerInputEvent<Date>) {
    if (
      this.startDate.value &&
      this.endDate.value &&
      this.startDate.value >= this.minDate
    ) {
      this.dateError = false;
      const differenceInTime =
        this.endDate.value.getTime() - this.startDate.value.getTime();

      const days = differenceInTime / (1000 * 3600 * 24);
      this.price = +this.offer.price * days;
    } else {
      this.dateError = true;
      this.price = 0;
    }
  }

  private getOffer() {
    this.subscription = this.activatedRoute.params
      .pipe(
        mergeMap((params) => {
          const offerId = params['offerId'];

          return this.offerService.getOne$(offerId);
        })
      )
      .subscribe({
        next: (offer) => {
          this.offer = offer;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
