import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { AuthService } from 'src/app/auth.service';
import { errorHandler, passwordsMismatch } from '../../../util/form-errors';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  userRegisterForm!: FormGroup;
  password!: FormControl;

  get errHandler() {
    return errorHandler;
  }

  get passwordsGroup() {
    return this.userRegisterForm.controls['passwords'] as FormGroup;
  }

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.password = new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]);

    this.userRegisterForm = this.formBuilder.group({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      passwords: new FormGroup({
        password: this.password,
        rePassword: new FormControl(null, [
          Validators.required,
          passwordsMismatch(this.password),
        ]),
      }),
    });
  }

  handleUserRegister() {
    if (this.userRegisterForm.invalid) {
      return this.userRegisterForm.markAllAsTouched();
    }

    const body = {
      username: this.userRegisterForm.value['username'],
      password: this.passwordsGroup.value['password'],
      rePassword: this.passwordsGroup.value['rePassword'],
    };

    this.authService.userRegister$(body).subscribe({
      next: (user) => {
        this.authService.handleLogin(user);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
