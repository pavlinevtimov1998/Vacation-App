import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { IOffer } from 'src/app/shared/interfaces';
import { OfferService } from '../../offer.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
})
export class BookingFormComponent implements OnInit {
  @Input() offer!: IOffer;

  minDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() + 1
  );
  price: number = 0;
  dateError: boolean = false;
  errorMessage = '';
  dateForm!: FormGroup;

  constructor(
    private offerService: OfferService,
    private router: Router,
    private formBuilder: FormBuilder
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
  }

  formHandler() {
    if (
      !this.dateForm.controls['startDate'].value ||
      !this.dateForm.controls['endDate'].value ||
      this.dateForm.controls['startDate'].value < this.minDate
    ) {
      this.dateError = true;
      return;
    }

    const body = this.dateForm.value;
    body.agency = this.offer.agency._id;
    body.price = +this.price.toFixed(2);

    this.offerService.booking$(body, this.offer._id).subscribe({
      next: (response) => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  dateChangeHandler() {
    if (
      this.dateForm.controls['startDate'].value &&
      this.dateForm.controls['endDate'].value &&
      this.dateForm.controls['startDate'].value >= this.minDate
    ) {
      this.dateError = false;
      const differenceInTime =
        this.dateForm.controls['endDate'].value.getTime() -
        this.dateForm.controls['startDate'].value.getTime();

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
