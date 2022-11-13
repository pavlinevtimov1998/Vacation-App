import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { errorHandler } from 'src/app/util/form-errors';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  createOfferForm!: FormGroup;

  get errHandler() {
    return errorHandler;
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createOfferForm = this.formBuilder.group({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required]),
      town: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
    });
  }

  handleCreateOffer() {
    if (this.createOfferForm.invalid) {
      return this.createOfferForm.markAllAsTouched();
    }
  }
}
