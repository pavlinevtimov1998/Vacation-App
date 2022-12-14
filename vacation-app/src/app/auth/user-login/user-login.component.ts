import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { MessageBusService } from 'src/app/message-bus.service';
import { MessageType } from 'src/app/shared/interfaces';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent {
  isLoading = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private messageBus: MessageBusService
  ) {}

  handleUserLogin(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }

    const body = {
      username: loginForm.value['username'],
      password: loginForm.value['password'],
    };

    this.isLoading = true;

    this.userService.userLogin$(body).subscribe({
      next: () => {
        this.messageBus.addMessage({
          message: 'Successful login!',
          type: MessageType.Success,
        });

        loginForm.reset();
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }
}
