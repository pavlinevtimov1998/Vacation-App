import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

import { MessageBusService } from 'src/app/message-bus.service';
import { IUser } from 'src/app/shared/interfaces';
import { MessageType } from 'src/app/shared/interfaces';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  userData!: IUser;

  image!: File;
  imageName!: string;
  isImageError = false;

  isLoading = true;
  isSubmited = false;

  subscription$!: Subscription;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private messageBus: MessageBusService
  ) {}

  ngOnInit(): void {
    this.subscription$ = this.userService.getUserData$().subscribe({
      next: (userData) => {
        this.userData = userData;
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

  editUserHandler(form: NgForm) {
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
    this.userService.editUserProfileData$(formData).subscribe({
      next: (user) => {        
        this.authService.handleLogin(user);

        this.messageBus.addMessage({
          message: 'Successfully editing!',
          type: MessageType.Success,
        });

        form.reset();
        this.router.navigate(['/user/profile']);
      },
      error: (err) => {
        this.isSubmited = false;
      },
    });
  }
}
