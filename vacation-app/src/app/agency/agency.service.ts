import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { MessageBusService } from '../message-bus.service';
import { IOffer } from '../shared/interfaces';
import { IAccount, IAgency } from '../shared/interfaces/account.interface';
import { MessageType } from '../shared/interfaces/message.interface';

@Injectable({
  providedIn: 'root',
})
export class AgencyService {
  constructor(
    private httpClient: HttpClient,
    private messageBus: MessageBusService,
    private router: Router
  ) {}

  isUnique$(prop: string, value: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${environment.api}/agency/${prop}`, {
      params: { [prop]: value },
    });
  }

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
  ): Observable<{ offers: IOffer[]; agency: IAgency; offersCount: number }> {
    return this.httpClient.get<{
      offers: IOffer[];
      agency: IAgency;
      offersCount: number;
    }>(`${environment.api}/profile/agency/offers/${agencyId}`, {
      params: { skip, limit },
    });
  }

  logout$(): void {
    this.httpClient
      .post<{ message: string }>(
        `${environment.api}/agency/logout`,
        {},
        { withCredentials: true }
      )
      .subscribe(({ message }) => {
        this.messageBus.addMessage({ message, type: MessageType.Success });
        this.router.navigate(['/']);
      });
  }
}
