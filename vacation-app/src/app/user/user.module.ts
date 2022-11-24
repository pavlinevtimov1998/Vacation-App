import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { userRoutingModule } from './app-user-routing.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './profile/profile.component';
import { BookedVacationsComponent } from './profile/booked-vacations/booked-vacations.component';

@NgModule({
  declarations: [
    UserLoginComponent,
    UserRegisterComponent,
    UserProfileComponent,
    BookedVacationsComponent,
  ],
  imports: [CommonModule, SharedModule, userRoutingModule, ReactiveFormsModule],
})
export class UserModule {}
