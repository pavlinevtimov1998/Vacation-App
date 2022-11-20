import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from 'src/app/auth/auth.service';
import { AuthDialogComponent } from 'src/app/shared/dialog/auth-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  currentUser$ = this.authService.currentUser$;
  isLogged$ = this.authService.islogged$;

  toggleProfileMobNav = false;

  constructor(private authService: AuthService, private dialog: MatDialog) {}

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

  loginClick() {
    this.dialog.open(AuthDialogComponent, {
      width: '400px',
      height: '300px',
    });
  }
}
