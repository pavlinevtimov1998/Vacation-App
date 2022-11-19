import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IAccount } from '../shared/interfaces/account.interface';

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
      environment.api + '/agency/register',
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
      environment.api + '/agency/login',
      body,
      {
        withCredentials: true,
      }
    );
  }

  logout$(): Observable<{ message: string }> {
    return this.httpClient.get<{ message: string }>(
      environment.api + '/agency/logout',
      { withCredentials: true }
    );
  }
}
