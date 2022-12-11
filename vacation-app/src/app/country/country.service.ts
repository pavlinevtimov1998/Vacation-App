import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IOffer } from '../shared/interfaces';
import { ICountry } from '../shared/interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private httpClient: HttpClient) {}

  getCountries$(
    skip: number,
    limit: number,
    search: string
  ): Observable<{ countries: ICountry[]; countriesCount: number }> {
    return this.httpClient.get<{
      countries: ICountry[];
      countriesCount: number;
    }>(`${environment.api}/countries`, {
      params: { skip, limit, search },
    });
  }

  getAllCountries$(): Observable<ICountry[]> {
    return this.httpClient.get<ICountry[]>(`${environment.api}/countries/all`);
  }

  getCountry$(
    countryId: string
  ): Observable<{ country: ICountry; offersCount: number }> {
    return this.httpClient.get<{ country: ICountry; offersCount: number }>(
      `${environment.api}/countries/${countryId}`,
      { withCredentials: true }
    );
  }

  getCountryOffers$(
    countryId: string,
    skip: number,
    limit: number
  ): Observable<IOffer[]> {
    return this.httpClient.get<IOffer[]>(
      `${environment.api}/countries/offers/${countryId}?skip=${skip}&limit=${limit}`,
      { withCredentials: true }
    );
  }
}
