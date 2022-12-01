import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { IOffer } from 'src/app/shared/interfaces';
import { numbersLengthValidator } from 'src/app/util/form-errors';
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

  minDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() + 1
  );
  price: number = 0;
  dateError: boolean = false;
  errorMessage = '';

  bookingForm!: FormGroup;

  constructor(
    private offerService: OfferService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.bookingForm = this.formBuilder.group({
      startDate: new FormControl<Date | null>({ value: null, disabled: true }, [
        Validators.required,
      ]),
      endDate: new FormControl<Date | null>({ value: null, disabled: true }, [
        Validators.required,
      ]),
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
    if (
      !this.bookingForm.controls['startDate'].value ||
      !this.bookingForm.controls['endDate'].value ||
      this.bookingForm.controls['startDate'].value < this.minDate ||
      this.bookingForm.invalid
    ) {
      this.bookingForm.markAllAsTouched();
      this.dateError = true;
      return;
    }

    const body = this.bookingForm.value;
    body.startDate = this.bookingForm.controls['startDate'].value;
    body.endDate = this.bookingForm.controls['endDate'].value;
    body.agency = this.offer.agency._id;
    body.price = +this.price.toFixed(2);

    this.offerService.booking$(body, this.offer._id).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  dateChangeHandler() {
    if (
      this.bookingForm.controls['startDate'].value &&
      this.bookingForm.controls['endDate'].value &&
      this.bookingForm.controls['startDate'].value >= this.minDate
    ) {
      this.dateError = false;
      const differenceInTime =
        this.bookingForm.controls['endDate'].value.getTime() -
        this.bookingForm.controls['startDate'].value.getTime();

      const days = differenceInTime / (1000 * 3600 * 24);

      if (days == 0) {
        this.dateError = true;
        this.errorMessage = 'Your vacation should be for more than one day!';
        this.price = 0;
        return;
      }

      this.price = +this.offer.price * days;
    } else {
      this.errorMessage = '';
      this.dateError = true;
      this.price = 0;
    }
  }
}
