import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class LoadingInterceptor implements HttpInterceptor {
  requests = 0;

  constructor(private loadingService: LoadingService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.requests === 0) {
      this.loadingService.startLoading();
    }

    this.requests++;

    return next.handle(request).pipe(
      finalize(() => {
        this.requests--;

        if (this.requests == 0) {
          this.loadingService.stopLoading();
        }
      })
    );
  }
}
