import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.css'],
})
export class MobileNavComponent implements OnInit {
  isLogged$ = this.authService.islogged$;
  currentUser$ = this.authService.currentUser$;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
}
