import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IOffer } from '../shared/interfaces';
import { IAccount, IAgency } from '../shared/interfaces/account.interface';

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

  getAgencyProfileData$(agencyId: string): Observable<IAgency> {
    return this.httpClient.get<IAgency>(
      `${environment.api}/profile/agency/${agencyId}`,
      { withCredentials: true }
    );
  }

  editAgencyProfileData$(body: FormData): Observable<IAgency> {
    return this.httpClient.patch<IAgency>(
      `${environment.api}/profile/agency/edit`,
      body,
      { withCredentials: true }
    );
  }

  getTopAgencies$(): Observable<IAgency[]> {
    return this.httpClient.get<IAgency[]>(
      `${environment.api}/agency/top-agencies`,
      { withCredentials: true }
    );
  }

  getAgencyOffers$(
    agencyId: string,
    skip: number,
    limit: number
  ): Observable<{ offers: IOffer[]; agencyName: string; offersCount: number }> {
    return this.httpClient.get<{
      offers: IOffer[];
      agencyName: string;
      offersCount: number;
    }>(`${environment.api}/profile/agency/offers/${agencyId}`, {
      params: { skip, limit },
    });
  }

  logout$(): Observable<{ message: string }> {
    return this.httpClient.get<{ message: string }>(
      `${environment.api}/agency/logout`,
      { withCredentials: true }
    );
  }
}
