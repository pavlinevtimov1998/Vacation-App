import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { agencyRoutingModule } from './app-agency-routing.module';
import { AgencyProfileComponent } from './profile/profile.component';
import { AsideComponent } from './profile/aside/aside.component';
import { MessageFormComponent } from './profile/message-form/message-form.component';
import { ContactsComponent } from './profile/contacts/contacts.component';

@NgModule({
  declarations: [
    AgencyProfileComponent,
    AsideComponent,
    MessageFormComponent,
    ContactsComponent,
  ],
  imports: [CommonModule, SharedModule, agencyRoutingModule],
})
export class AgencyModule {}
