import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { MessageBusService } from '../message-bus.service';
import { IOffer } from '../shared/interfaces';
import { IAccount, IUser } from '../shared/interfaces';
import { IBooking } from '../shared/interfaces';
import { MessageType } from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
    private messageBus: MessageBusService,
    private router: Router
  ) {}

  isUnique$(username: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${environment.api}/user/username`, {
      params: { username },
    });
  }

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

  editUserProfileData$(userData: FormData): Observable<IAccount> {
    return this.httpClient.patch<IAccount>(
      `${environment.api}/profile/user/edit`,
      userData,
      {
        withCredentials: true,
      }
    );
  }

  logout$(): void {
    this.httpClient
      .post<{ message: string }>(
        `${environment.api}/user/logout`,
        {},
        { withCredentials: true }
      )
      .subscribe(({ message }) => {
        this.messageBus.addMessage({ message, type: MessageType.Success });
        this.router.navigate(['/']);
      });
  }
}
