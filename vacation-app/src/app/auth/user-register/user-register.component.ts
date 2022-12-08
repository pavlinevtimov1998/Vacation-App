import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { MessageBusService } from 'src/app/message-bus.service';
import { MessageType } from 'src/app/shared/interfaces/message.interface';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent {
  isLoading = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private messageBus: MessageBusService
  ) {}

  handleUserRegister(registerForm: NgForm) {
    if (registerForm.invalid) {
      return;
    }

    const body = {
      username: registerForm.value['username'],
      password: registerForm.value['password'],
      rePassword: registerForm.value['rePassword'],
    };

    this.isLoading = true;

    this.userService.userRegister$(body).subscribe({
      next: () => {
        this.messageBus.addMessage({
          message: 'Successful register!',
          type: MessageType.Success,
        });

        registerForm.reset();
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }
}
