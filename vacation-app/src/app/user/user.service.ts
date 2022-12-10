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

  getUserProfileData$(
    skip: number,
    limit: number
  ): Observable<{
    profileData: IUser;
    bookings: IBooking[];
    bookingsCount: number;
  }> {
    return this.httpClient.get<{
      profileData: IUser;
      bookings: IBooking[];
      bookingsCount: number;
    }>(`${environment.api}/profile/user`, {
      withCredentials: true,
      params: { skip, limit },
    });
  }

  getUserFavouritesOffers$(
    skip: number,
    limit: number
  ): Observable<{ offers: IOffer[]; offersCount: number }> {
    return this.httpClient.get<{ offers: IOffer[]; offersCount: number }>(
      `${environment.api}/favourites`,
      {
        withCredentials: true,
        params: { skip, limit },
      }
    );
  }

  getUserData$(): Observable<IUser> {
    return this.httpClient.get<IUser>(`${environment.api}/profile/user-data`, {
      withCredentials: true,
    });
  }

  editUserProfileData$(userData: FormData): Observable<IUser> {
    return this.httpClient.patch<IUser>(
      `${environment.api}/profile/user/edit`,
      userData,
      {
        withCredentials: true,
      }
    );
  }

  logout$(): Observable<{ message: string }> {
    return this.httpClient.get<{ message: string }>(
      `${environment.api}/user/logout`,
      { withCredentials: true }
    );
  }
}
