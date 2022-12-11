import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { SharedModule } from '../shared/shared.module';
import { agencyRoutingModule } from './app-agency-routing.module';
import { AgencyProfileComponent } from './profile/profile.component';
import { AsideComponent } from './profile/aside/aside.component';
import { MessageFormComponent } from './profile/message-form/message-form.component';
import { ContactsComponent } from './profile/contacts/contacts.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AgencyOffersComponent } from './agency-offers/agency-offers.component';
import { CreateOfferComponent } from './create-offer/create-offer.component';

@NgModule({
  declarations: [
    AgencyProfileComponent,
    AsideComponent,
    MessageFormComponent,
    ContactsComponent,
    EditProfileComponent,
    AgencyOffersComponent,
    CreateOfferComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    agencyRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
})
export class AgencyModule {}
