import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { IAccount } from './shared/interfaces';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          if (event.url?.endsWith('login') || event.url?.endsWith('register')) {
            const account = event.body as IAccount;

            if (account?.agencyName) {
              account.isAgency = true;
            } else {
              account.isAgency = false;
            }

            this.authService.handleLogin(account);
          } else if (event.url?.endsWith('logout')) {
            this.authService.handleLogout();
          }
        }
      })
    );
  }
}
