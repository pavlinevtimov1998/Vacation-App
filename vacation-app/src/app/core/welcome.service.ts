import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IOffer } from '../shared/interfaces/offer.interface';

@Injectable({
  providedIn: 'root',
})
export class WelcomeService {
  constructor(private httpClient: HttpClient) {}

  getCarouselData(): Observable<IOffer[]> {
    return this.httpClient.get<IOffer[]>(environment.api, {
      withCredentials: true,
    });
  }
}
