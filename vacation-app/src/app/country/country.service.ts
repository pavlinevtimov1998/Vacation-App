import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ICountry } from '../shared/interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private httpClient: HttpClient) {}

  getAllCountries$(): Observable<ICountry[]> {
    return this.httpClient.get<ICountry[]>(`${environment.api}/countries`, {
      withCredentials: true,
    });
  }
}
