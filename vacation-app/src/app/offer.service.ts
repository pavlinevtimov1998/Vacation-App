import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IOffer } from './shared/interfaces/offer.interface';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  constructor(private httpClient: HttpClient) {}

  createOffer(body: FormData): Observable<IOffer> {
    return this.httpClient.post<IOffer>(environment.api + 'data/offers', body, {
      withCredentials: true,
    });
  }
}
