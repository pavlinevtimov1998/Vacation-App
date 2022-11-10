import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { authRoutingModule } from './app-auth-routing.module';
import { MaterialModule } from '../material/material.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { AgencyLoginComponent } from './agency-login/agency-login.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ProfileComponent, UserLoginComponent, AgencyLoginComponent],
  imports: [CommonModule, authRoutingModule, MaterialModule],
})
export class AuthModule {}
