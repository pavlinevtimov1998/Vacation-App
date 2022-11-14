import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { OfferService } from 'src/app/offer.service';
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

  constructor(
    private formBuilder: FormBuilder,
    private offerService: OfferService
  ) {}

  ngOnInit(): void {
    this.createOfferForm = this.formBuilder.group({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required]),
      town: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      images: new FormControl(null, [Validators.required]),
    });
  }

  onImageUpload(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    const images: File[] = [];

    if (files) {
      for (let i = 0; i < files.length; i++) {
        images.push(files.item(i) as File);
      }
      this.createOfferForm.patchValue({
        images: images,
      });
    }
  }

  handleCreateOffer() {
    if (this.createOfferForm.invalid) {
      return this.createOfferForm.markAllAsTouched();
    }

    const formData = new FormData();

    Object.entries(this.createOfferForm.value).forEach(([key, value]) => {
      if (key == 'images') {
        this.createOfferForm.value['images'].forEach((image: File) => {
          formData.append(key, image, image.name);
        });
      } else {
        formData.append(key, value as string);
      }
    });

    this.offerService.createOffer(formData).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
