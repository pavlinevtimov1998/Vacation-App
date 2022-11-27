import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AgencyLoginComponent } from './agency-login/agency-login.component';
import { AgencyRegisterComponent } from './agency-register/agency-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { agencyRoutingModule } from './app-agency-routing.module';
import { AgencyProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AgencyLoginComponent,
    AgencyRegisterComponent,
    AgencyProfileComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    agencyRoutingModule,
    ReactiveFormsModule,
  ],
})
export class AgencyModule {}
