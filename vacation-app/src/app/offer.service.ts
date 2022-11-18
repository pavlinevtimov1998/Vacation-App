import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICountry } from './shared/interfaces/country.interface';
import { IFeature, IOffer } from './shared/interfaces/offer.interface';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  constructor(private httpClient: HttpClient) {}

  getOffers$(): Observable<IOffer[]> {
    return this.httpClient.get<IOffer[]>(environment.api + '/offers', {
      withCredentials: true,
    });
  }

  getOne$(offerId: string): Observable<IOffer> {
    return this.httpClient.get<IOffer>(environment.api + '/offers/' + offerId, {
      withCredentials: true,
    });
  }

  createOffer(body: FormData): Observable<IOffer> {
    return this.httpClient.post<IOffer>(environment.api + '/offers', body, {
      withCredentials: true,
    });
  }

  getAllCountries$(): Observable<ICountry[]> {
    return this.httpClient.get<ICountry[]>(environment.api + '/countries', {
      withCredentials: true,
    });
  }

  getAllFeatures$(): Observable<IFeature[]> {
    return this.httpClient.get<IFeature[]>(environment.api + '/features', {
      withCredentials: true,
    });
  }
}
