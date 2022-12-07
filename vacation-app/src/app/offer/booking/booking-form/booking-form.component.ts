import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { IOffer } from 'src/app/shared/interfaces';
import {
  dateValidator,
  numbersLengthValidator,
} from 'src/app/util/form-errors';
import { OfferService } from '../../offer.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
})
export class BookingFormComponent implements OnInit {
  @Input() offer!: IOffer;

  get controls() {
    return this.bookingForm.controls;
  }

  get datesGroup() {
    return this.bookingForm.controls['dates'] as FormGroup;
  }

  minDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() + 1
  );
  price: number = 0;

  bookingForm!: FormGroup;

  constructor(
    private offerService: OfferService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const startDate = new FormControl<Date | null>(null, []);
    const endDate = new FormControl<Date | null>(null, [
      dateValidator(startDate),
    ]);

    this.bookingForm = this.formBuilder.group({
      dates: new FormGroup({
        startDate,
        endDate,
      }),
      cardHolder: new FormControl<string | null>(null, [Validators.required]),
      cardNumber: new FormControl(null, [
        Validators.required,
        numbersLengthValidator(16),
      ]),
      cvvNumber: new FormControl<number | null>(null, [
        Validators.required,
        numbersLengthValidator(3),
      ]),
      expiryMonth: new FormControl<number | null>(null, [
        Validators.required,
        Validators.max(12),
        Validators.min(1),
      ]),
      expiryYear: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(22),
        Validators.max(35),
      ]),
    });
  }

  formHandler() {
    if (this.bookingForm.invalid) {
      return this.bookingForm.markAllAsTouched();
    }

    // TODO: ADD PRICE FUNCTIONALITY!!!

    const { startDate, endDate } = this.bookingForm.controls['dates'].value;
    const body = {
      startDate,
      endDate,
      agency: this.offer.agency._id,
      price: +this.price.toFixed(2),
    };

    this.offerService.booking$(body, this.offer._id).subscribe({
      next: () => {
        this.router.navigate(['/user/profile']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
