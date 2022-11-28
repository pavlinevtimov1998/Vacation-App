import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { AgencyLoginComponent } from './agency-login/agency-login.component';
import { AgencyRegisterComponent } from './agency-register/agency-register.component';
import { agencyRoutingModule } from './app-agency-routing.module';
import { AgencyProfileComponent } from './profile/profile.component';
import { AsideComponent } from './profile/aside/aside.component';
import { MessageFormComponent } from './profile/message-form/message-form.component';
import { ContactsComponent } from './profile/contacts/contacts.component';

@NgModule({
  declarations: [
    AgencyLoginComponent,
    AgencyRegisterComponent,
    AgencyProfileComponent,
    AsideComponent,
    MessageFormComponent,
    ContactsComponent,
  ],
  imports: [CommonModule, SharedModule, agencyRoutingModule, FormsModule],
})
export class AgencyModule {}
