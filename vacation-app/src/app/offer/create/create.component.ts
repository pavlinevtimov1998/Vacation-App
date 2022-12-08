import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';

import { CountryService } from 'src/app/country/country.service';
import { MessageBusService } from 'src/app/message-bus.service';
import { OfferService } from 'src/app/offer/offer.service';
import { ICountry } from 'src/app/shared/interfaces/country.interface';
import { MessageType } from 'src/app/shared/interfaces/message.interface';
import { IFeature } from 'src/app/shared/interfaces/offer.interface';
import { errorHandler, imageTypeValidator } from 'src/app/util/form-errors';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit, OnDestroy {
  createOfferForm!: FormGroup;

  get errHandler() {
    return errorHandler;
  }

  isLoading = true;
  isSubmited = false;

  subscription!: Subscription;
  countries!: ICountry[];
  features!: IFeature[];

  constructor(
    private formBuilder: FormBuilder,
    private countryService: CountryService,
    private offerService: OfferService,
    private router: Router,
    private messageBus: MessageBusService
  ) {}

  ngOnInit(): void {
    this.loadData();

    this.createOfferForm = this.formBuilder.group({
      title: new FormControl<string | null>(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
      ]),
      description: new FormControl<string | null>(null, [
        Validators.required,
        Validators.minLength(20),
      ]),
      country: new FormControl<string | null>(null, [Validators.required]),
      town: new FormControl<string | null>(null, [
        Validators.required,
        Validators.maxLength(25),
      ]),
      price: new FormControl<number | null>(null, [Validators.required]),
      images: new FormControl<File[] | null>(null, [
        Validators.required,
        imageTypeValidator,
      ]),
    });
  }

  onImageUpload(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    const images: File[] = [];

    if (files) {
      for (let i = 0; i < files.length; i++) {
        if (i > 4) {
          break;
        }
        images.push(files[i]);
      }

      console.log(images);

      this.createOfferForm.patchValue({
        images: images,
      });
    }
  }

  handleCreateOffer(checkboxes: HTMLDivElement) {
    if (this.createOfferForm.invalid) {
      return this.createOfferForm.markAllAsTouched();
    }

    const checkedFeatures: string[] = [];
    checkboxes.querySelectorAll('input').forEach((input) => {
      input.checked ? checkedFeatures.push(input.value) : null;
    });

    const formData = new FormData();
    formData.append('features', checkedFeatures.join(','));

    Object.entries(this.createOfferForm.value).forEach(([key, value]) => {
      if (key == 'images') {
        this.createOfferForm.value['images'].forEach((image: File) => {
          formData.append(key, image, image.name);
        });
      } else {
        if (key == 'country') {
          const countryId = this.countries.find((c) => c.name == value)?._id;
          if (countryId) {
            formData.append(key, countryId as string);
          }
        } else {
          formData.append(key, value as string);
        }
      }
    });

    this.isSubmited = true;

    this.offerService.createOffer(formData).subscribe({
      next: (offer) => {
        this.messageBus.addMessage({
          message: 'Successfully created!',
          type: MessageType.Success,
        });

        this.createOfferForm.reset();
        this.router.navigate(['/details', offer._id]);
      },
      error: (err) => {
        this.router.navigate(['/']);
      },
    });
  }

  loadData(): void {
    this.subscription = combineLatest([
      this.countryService.getAllCountries$(),
      this.offerService.getAllFeatures$(),
    ]).subscribe({
      next: ([countries, features]) => {
        this.features = features;
        this.countries = countries;

        this.isLoading = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
