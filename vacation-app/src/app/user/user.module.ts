import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { userRoutingModule } from './app-user-routing.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './profile/profile.component';
import { ReservedVacationsComponent } from './profile/reserved-vacations/reserved-vacations.component';



@NgModule({
  declarations: [UserLoginComponent, UserRegisterComponent, UserProfileComponent, ReservedVacationsComponent],
  imports: [
    CommonModule,
    SharedModule,
    userRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
