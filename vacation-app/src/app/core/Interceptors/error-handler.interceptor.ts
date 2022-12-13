import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { MessageBusService } from 'src/app/message-bus.service';
import { MessageType } from 'src/app/shared/interfaces/message.interface';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private messageBus: MessageBusService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        console.log(error.error.message);
        console.log(error);

        this.messageBus.addMessage({
          message: error?.error?.message || 'Something went wrong!',
          type: MessageType.Error,
        });

        return throwError(() => error);
      })
    );
  }
}
