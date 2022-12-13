import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { IMessage } from './shared/interfaces';


@Injectable({
  providedIn: 'root',
})
export class MessageBusService {
  private messageContainer$$ = new Subject<IMessage | undefined>();

  onNewMessage$ = this.messageContainer$$.asObservable();

  constructor() {}

  addMessage(message: IMessage): void {
    this.messageContainer$$.next(message);
  }

  clearMessage(): void {
    this.messageContainer$$.next(undefined);
  }
}
