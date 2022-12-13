import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { userRoutingModule } from './app-user-routing.module';
import { UserProfileComponent } from './profile/profile.component';
import { BookedVacationsComponent } from './profile/booked-vacations/booked-vacations.component';
import { LikedOffersComponent } from './liked-offers/liked-offers.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    UserProfileComponent,
    BookedVacationsComponent,
    LikedOffersComponent,
    EditProfileComponent,
  ],
  imports: [CommonModule, SharedModule, userRoutingModule, FormsModule],
})
export class UserModule {}
