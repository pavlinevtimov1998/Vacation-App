import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

import { MessageBusService } from 'src/app/message-bus.service';
import { IAgency } from 'src/app/shared/interfaces';
import { MessageType } from 'src/app/shared/interfaces';
import { AgencyService } from '../agency.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  agencyData!: IAgency;
  agencyId!: string;

  image!: File;
  imageName!: string;
  isImageError = false;

  isLoading = true;
  isSubmited = false;

  subscription!: Subscription;

  constructor(
    private authService: AuthService,
    private agencyService: AgencyService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private messageBus: MessageBusService
  ) {}

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params
      .pipe(
        mergeMap((params) => {
          this.agencyId = params['agencyId'];

          return this.agencyService.getAgencyProfileData$(this.agencyId);
        })
      )

      .subscribe({
        next: (agency) => {
          this.agencyData = agency;
          this.isLoading = false;
        },
      });
  }

  imageUpload(event: Event) {
    const files = (event.target as HTMLInputElement).files;

    if (files) {
      if (files[0].type.includes('jpeg') || files[0].type.includes('png')) {
        this.image = files[0];
        this.imageName = this.image.name;
        this.isImageError = false;
      } else {
        this.isImageError = true;
      }
    }
  }

  editAgencyHandler(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const formData = new FormData();

    Object.entries(form.value).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value as string);
      }
    });

    if (this.image) {
      formData.append('image', this.image, this.image.name);
    }

    this.isSubmited = true;
    this.agencyService.editAgencyProfileData$(formData).subscribe({
      next: (agency) => {
        this.authService.handleLogin(agency);

        this.messageBus.addMessage({
          message: 'Successfully editing!',
          type: MessageType.Success,
        });

        form.reset();
        this.router.navigate(['/agency/profile', this.agencyData._id]);
      },
      error: (err) => {
        this.isSubmited = false;
      },
    });
  }
}
