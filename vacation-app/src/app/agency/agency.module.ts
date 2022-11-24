import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { userRoutingModule } from '../user/app-user-routing.module';
import { AgencyLoginComponent } from './agency-login/agency-login.component';
import { AgencyRegisterComponent } from './agency-register/agency-register.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AgencyLoginComponent, AgencyRegisterComponent],
  imports: [
    CommonModule,
    SharedModule,
    userRoutingModule,
    ReactiveFormsModule
  ]
})
export class AgencyModule { }
