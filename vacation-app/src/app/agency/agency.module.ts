import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { AgencyLoginComponent } from './agency-login/agency-login.component';
import { AgencyRegisterComponent } from './agency-register/agency-register.component';
import { agencyRoutingModule } from './app-agency-routing.module';
import { AgencyProfileComponent } from './profile/profile.component';
import { PasswordsValidatorDirective } from './passwords-validator.directive';

@NgModule({
  declarations: [
    AgencyLoginComponent,
    AgencyRegisterComponent,
    AgencyProfileComponent,
    PasswordsValidatorDirective,
  ],
  imports: [CommonModule, SharedModule, agencyRoutingModule, FormsModule],
})
export class AgencyModule {}
