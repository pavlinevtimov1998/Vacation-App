import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  startLoading() {
    this.isLoading$.next(true);
  }

  stopLoading() {
    this.isLoading$.next(false);
  }
}
