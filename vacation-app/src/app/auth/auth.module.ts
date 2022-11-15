import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { authRoutingModule } from './app-auth-routing.module';
import { MaterialModule } from '../material/material.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { AgencyLoginComponent } from './agency-login/agency-login.component';
import { AgencyRegisterComponent } from './agency-register/agency-register.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProfileComponent,
    UserLoginComponent,
    AgencyLoginComponent,
    AgencyRegisterComponent,
    UserRegisterComponent,
  ],
  imports: [
    CommonModule,
    authRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
