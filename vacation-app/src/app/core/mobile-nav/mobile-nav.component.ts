import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.css'],
})
export class MobileNavComponent implements OnInit {
  isLogged$ = this.authService.islogged$;
  currentUser$ = this.authService.currentUser$;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

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
