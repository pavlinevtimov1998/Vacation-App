import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-dialog',
  template: `<h1 mat-dialog-title>
      You already have account?
      <a class="link" routerLink="/auth/user/login" mat-dialog-close="true"
        >Sign In</a
      >
      ,
      <a class="link" routerLink="/auth/agency/login" mat-dialog-close="true"
        >Sign In like Agency</a
      >
    </h1>
    <p>Choose one if you don't have account!</p>

    <mat-dialog-actions>
      <button mat-raised-button mat-dialog-close="true" color="primary">
        Sign Up
      </button>
      <button mat-raised-button mat-dialog-close="true" color="primary">
        Sign Up like Agency
      </button>
    </mat-dialog-actions> `,
})
export class AuthDialogComponent {
  constructor() {}
}
