import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent {
  constructor(private userService: UserService, private router: Router) {}

  handleUserLogin(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }

    const body = {
      username: loginForm.value['username'],
      password: loginForm.value['password'],
    };

    this.userService.userLogin$(body).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
