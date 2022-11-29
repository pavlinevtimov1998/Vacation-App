import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent {
  constructor(private userService: UserService, private router: Router) {}

  handleUserRegister(registerForm: NgForm) {
    if (registerForm.invalid) {
      return;
    }

    const body = {
      username: registerForm.value['username'],
      password: registerForm.value['password'],
      rePassword: registerForm.value['rePassword'],
    };

    this.userService.userRegister$(body).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        registerForm.reset();
      },
    });
  }
}
