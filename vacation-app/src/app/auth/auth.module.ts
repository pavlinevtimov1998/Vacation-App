import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AgencyLoginComponent } from './agency-login/agency-login.component';
import { AgencyRegisterComponent } from './agency-register/agency-register.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { authRoutingModule } from './app-auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AccountChoicesComponent } from './account-choices/account-choices.component';

@NgModule({
  declarations: [
    AgencyLoginComponent,
    AgencyRegisterComponent,
    UserLoginComponent,
    UserRegisterComponent,
    AccountChoicesComponent,
  ],
  imports: [CommonModule, authRoutingModule, SharedModule, FormsModule],
})
export class AuthModule {}
