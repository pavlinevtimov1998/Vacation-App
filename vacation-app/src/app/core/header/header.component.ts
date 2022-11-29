import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  get currentUser$() {
    return this.authService.currentUser$;
  }

  get isLogged$() {
    return this.authService.isLogged$;
  }

  subscription!: Subscription;

  toggleProfileMobNav = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  openMobileNav(aside: HTMLElement) {
    aside.style.right = '0px';
  }

  closeMobileNav(aside: HTMLElement) {
    aside.style.right = '-300px';
  }

  clickedOutside(aside: HTMLElement): void {
    aside.style.right = '-300px';
  }

  profileMobileLinks() {
    this.toggleProfileMobNav = !this.toggleProfileMobNav;
  }
}
