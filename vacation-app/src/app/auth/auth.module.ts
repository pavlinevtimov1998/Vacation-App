import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login-page/login/login.component';
import { RegisterComponent } from './register-page/register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { authRoutingModule } from './app-auth-routing.module';
import { MaterialModule } from '../material/material.module';
import { UserLoginComponent } from './login-page/user-login/user-login.component';
import { AgencyLoginComponent } from './login-page/agency-login/agency-login.component';
import { AgencyRegisterComponent } from './register-page/agency-register/agency-register.component';
import { UserRegisterComponent } from './register-page/user-register/user-register.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
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
