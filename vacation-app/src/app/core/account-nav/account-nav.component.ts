import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-account-nav',
  templateUrl: './account-nav.component.html',
  styleUrls: ['./account-nav.component.css']
})
export class AccountNavComponent implements OnInit {
  currentUser$ = this.authService.currentUser$;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
