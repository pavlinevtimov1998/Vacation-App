import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, Subscription } from 'rxjs';
import { IAgency } from 'src/app/shared/interfaces';
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

  subscription!: Subscription;

  constructor(
    private agencyService: AgencyService,
    private activatedRoute: ActivatedRoute,
    private router: Router
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
          console.log(agency);

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

    this.agencyService.editAgencyProfileData$(formData).subscribe({
      next: (response) => {
        console.log(response);
        // this.router.navigate(['/profile', this.agencyData._id]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
