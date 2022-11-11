import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IAccount } from '../../shared/interfaces/account.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  currentUser$ = this.authService.currentUser$;
  isLogged$ = this.authService.islogged$;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  openMobileNav(aside: HTMLElement) {
    aside.style.right = '0px';
  }

  closeMobileNav(aside: HTMLElement) {
    aside.style.right = '-300px';
  }
}
