import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IAccount, IAgency } from '../shared/interfaces/account.interface';
import { IBooking } from '../shared/interfaces/booking.interface';

@Injectable({
  providedIn: 'root',
})
export class AgencyService {
  constructor(private httpClient: HttpClient) {}

  agencyRegister$(body: {
    email: string;
    agencyName: string;
    password: string;
    rePassword: string;
  }): Observable<IAccount> {
    return this.httpClient.post<IAccount>(
      `${environment.api}/agency/register`,
      body,
      {
        withCredentials: true,
      }
    );
  }

  agencyLogin$(body: {
    email: string;
    password: string;
  }): Observable<IAccount> {
    return this.httpClient.post<IAccount>(
      `${environment.api}/agency/login`,
      body,
      {
        withCredentials: true,
      }
    );
  }

  getAgencyProfileData$(): Observable<{ agency: IAgency; bookings: IBooking }> {
    return this.httpClient.get<{ agency: IAgency; bookings: IBooking }>(
      `${environment.api}/profile/agency/:agencyId`,
      { withCredentials: true }
    );
  }

  getTopAgencies$(): Observable<IAgency[]> {
    return this.httpClient.get<IAgency[]>(
      `${environment.api}/agency/top-agencies`,
      { withCredentials: true }
    );
  }

  logout$(): Observable<{ message: string }> {
    return this.httpClient.get<{ message: string }>(
      `${environment.api}/agency/logout`,
      { withCredentials: true }
    );
  }
}
