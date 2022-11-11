import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { AuthService } from 'src/app/auth.service';
import { errorHandler } from '../../util/form-errors';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  userLoginForm!: FormGroup;

  get errHandler() {
    return errorHandler;
  }

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userLoginForm = this.formBuilder.group({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  handleUserLogin() {
    if (this.userLoginForm.invalid) {
      return this.userLoginForm.markAllAsTouched();
    }

    const body = this.userLoginForm.value;

    this.authService.userLogin$(body).subscribe({
      next: (user) => {
        this.authService.handleLogin(user);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
