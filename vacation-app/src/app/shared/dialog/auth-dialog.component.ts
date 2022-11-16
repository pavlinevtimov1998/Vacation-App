import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-dialog',
  template: `<div class="sign-in">
      <h1 mat-dialog-title>Searching for vacations?</h1>
      <mat-dialog-actions>
        <button
          (click)="userHandler('login')"
          mat-raised-button
          mat-dialog-close="true"
          color="primary"
        >
          Login
        </button>
        <button
          (click)="userHandler('register')"
          mat-raised-button
          mat-dialog-close="true"
          color="primary"
        >
          Register
        </button>
      </mat-dialog-actions>
    </div>
    <div class="line"></div>
    <div class="sign-up">
      <h1 mat-dialog-title>Searching place to grow your Agency?</h1>
      <mat-dialog-actions>
        <button
          (click)="agencyHandler('login')"
          mat-raised-button
          mat-dialog-close="true"
          color="primary"
        >
          Agency Login
        </button>
        <button
          (click)="agencyHandler('register')"
          mat-raised-button
          mat-dialog-close="true"
          color="primary"
        >
          Agency Register
        </button>
      </mat-dialog-actions>
    </div>`,
  styleUrls: ['auth-dialog.component.css'],
})
export class AuthDialogComponent {
  constructor(private router: Router) {}

  agencyHandler(route: string) {
    console.log('here', route);

    this.router.navigate([`/auth/agency/${route}`]);
  }

  userHandler(route: string) {
    this.router.navigate([`/auth/user/${route}`]);
  }
}
