import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IBooking } from '../shared/interfaces';
import {
  IFeature,
  IOffer,
  IComment,
} from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  constructor(private httpClient: HttpClient) {}

  getOffers$(
    skip: number,
    limit: number,
    search: string
  ): Observable<{ offers: IOffer[]; offersCount: number }> {
    return this.httpClient.get<{ offers: IOffer[]; offersCount: number }>(
      `${environment.api}/offers`,
      { withCredentials: true, params: { skip, limit, search } }
    );
  }

  getOne$(offerId: string): Observable<IOffer> {
    return this.httpClient.get<IOffer>(`${environment.api}/offers${offerId}`, {
      withCredentials: true,
    });
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

  getOfferComments$(offerId: string): Observable<IComment[]> {
    return this.httpClient.get<IComment[]>(
      `${environment.api}/comments${offerId}`,
      {
        withCredentials: true,
      }
    );
  }

  deleteOffer$(offerId: string): Observable<{ message: string }> {
    return this.httpClient.delete<{ message: string }>(
      `${environment.api}/offers${offerId}`,
      { withCredentials: true }
    );
  }

  addComment$(
    body: {
      rating: number;
      content: string;
    },
    offerId: string
  ): Observable<IComment> {
    return this.httpClient.post<IComment>(
      `${environment.api}/comments${offerId}`,
      body,
      { withCredentials: true }
    );
  }

  booking$(
    body: {
      startDate: Date;
      endDate: Date;
      price: number;
      agency: string;
    },
    offerId: string
  ): Observable<IBooking> {
    return this.httpClient.post<IBooking>(
      `${environment.api}/offersbooking/${offerId}`,
      body,
      { withCredentials: true }
    );
  }

  cancelBooking$(offerId: string): Observable<{}> {
    return this.httpClient.delete<{}>(
      `${environment.api}/offerscancel-booking/${offerId}`,
      { withCredentials: true }
    );
  }

  addToFavourites$(
    offerId: string
  ): Observable<{ message: string; userId: string }> {
    return this.httpClient.post<{ message: string; userId: string }>(
      `${environment.api}/favourites${offerId}`,
      {},
      { withCredentials: true }
    );
  }

  removeFromFavourites$(
    offerId: string
  ): Observable<{ message: string; userId: string }> {
    return this.httpClient.delete<{ message: string; userId: string }>(
      `${environment.api}/favouritesremove/${offerId}`,
      { withCredentials: true }
    );
  }
}
