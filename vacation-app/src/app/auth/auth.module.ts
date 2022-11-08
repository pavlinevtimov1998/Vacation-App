import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { authRoutingModule } from './app-auth-routing.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ProfileComponent],
  imports: [CommonModule, authRoutingModule, MaterialModule],
  exports: [LoginComponent, RegisterComponent, ProfileComponent],
})
export class AuthModule {}
