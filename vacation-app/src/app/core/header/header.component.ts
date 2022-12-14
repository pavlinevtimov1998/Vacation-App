import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Subscription, take } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { MessageBusService } from 'src/app/message-bus.service';
import { MessageType } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('messageContainer', { static: true })
  messageContainer!: ElementRef<HTMLDivElement>;

  get currentUser$() {
    return this.authService.currentUser$;
  }

  get isLogged$() {
    return this.authService.isLogged$;
  }

  message!: string;
  isError!: boolean;

  interval!: NodeJS.Timeout;

  subscription$!: Subscription;

  toggleProfileMobNav = false;

  constructor(
    private authService: AuthService,
    private renderer: Renderer2,
    private messageBus: MessageBusService
  ) {}

  ngOnInit(): void {
    this.subscription$ = this.messageBus.onNewMessage$.subscribe((message) => {
      if (message) {
        this.message = message.message;
        this.isError = message.type === MessageType.Error;

        this.renderer.setStyle(
          this.messageContainer.nativeElement,
          'right',
          '2%'
        );

        this.interval = setTimeout(() => {
          this.messageBus.clearMessage();
          this.renderer.setStyle(
            this.messageContainer.nativeElement,
            'right',
            '-400px'
          );
        }, 3500);
      } else {
        clearInterval(this.interval);
      }
    });
  }

  openMobileNav(aside: HTMLElement) {
    this.renderer.setStyle(aside, 'right', '0px');
  }

  closeMobileNav(aside: HTMLElement) {
    this.renderer.setStyle(aside, 'right', '-300px');
  }

  clickedOutside(aside: HTMLElement): void {
    this.renderer.setStyle(aside, 'right', '-300px');
  }

  profileMobileLinks() {
    this.toggleProfileMobNav = !this.toggleProfileMobNav;
  }

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }
}
