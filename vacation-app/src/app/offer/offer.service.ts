import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ICountry } from '../shared/interfaces/country.interface';
import {
  IFeature,
  IOffer,
  IReview,
} from '../shared/interfaces/offer.interface';

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
    return this.httpClient.get<IOffer>(`${environment.api}/offers/${offerId}`, {
      withCredentials: true,
    });
  }

  getOfferReviews$(offerId: string): Observable<IReview[]> {
    return this.httpClient.get<IReview[]>(
      `${environment.api}/review/${offerId}`,
      {
        withCredentials: true,
      }
    );
  }

  createOffer(body: FormData): Observable<IOffer> {
    return this.httpClient.post<IOffer>(`${environment.api}/offers`, body, {
      withCredentials: true,
    });
  }

  getAllFeatures$(): Observable<IFeature[]> {
    return this.httpClient.get<IFeature[]>(`${environment.api}/features`, {
      withCredentials: true,
    });
  }
}
