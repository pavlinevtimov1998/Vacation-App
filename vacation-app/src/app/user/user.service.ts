import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IOffer } from '../shared/interfaces';
import { IAccount, IUser } from '../shared/interfaces/account.interface';
import { IBooking } from '../shared/interfaces/booking.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  userRegister$(body: {
    username: string;
    password: string;
    rePassword: string;
  }): Observable<IAccount> {
    return this.httpClient.post<IAccount>(
      `${environment.api}/user/register`,
      body,
      {
        withCredentials: true,
      }
    );
  }

  userLogin$(body: {
    username: string;
    password: string;
  }): Observable<IAccount> {
    return this.httpClient.post<IAccount>(
      `${environment.api}/user/login`,
      body,
      {
        withCredentials: true,
      }
    );
  }

  getUserProfileData$(): Observable<{
    profileData: IUser;
    bookings: IBooking[];
  }> {
    return this.httpClient.get<{ profileData: IUser; bookings: IBooking[] }>(
      `${environment.api}/profile/user`,
      { withCredentials: true }
    );
  }

  getUserFavouritesOffers$(): Observable<IOffer[]> {
    return this.httpClient.get<IOffer[]>(`${environment.api}/favourites`, {
      withCredentials: true,
    });
  }

  logout$(): Observable<{ message: string }> {
    return this.httpClient.get<{ message: string }>(
      `${environment.api}/user/logout`,
      { withCredentials: true }
    );
  }
}
