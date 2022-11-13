import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-account-nav',
  templateUrl: './account-nav.component.html',
  styleUrls: ['./account-nav.component.css'],
})
export class AccountNavComponent implements OnInit {
  currentUser$ = this.authService.currentUser$;

  isMenuOpened: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  toggleDropDownMenu() {
    this.isMenuOpened = !this.isMenuOpened;
  }

  clickedOutside() {
    this.isMenuOpened = false;
  }

  logoutHandler() {
    this.authService.logout$().subscribe({
      next: (response) => {
        this.authService.handleLogout();
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
        this.router.navigate(['/']);
      },
    });
  }
}
