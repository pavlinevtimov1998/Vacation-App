import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  userRegisterForm!: FormGroup;
  password!: FormControl;

  get passwordsGroup() {
    return this.userRegisterForm.controls['passwords'] as FormGroup;
  }

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.password = new FormControl(null, [Validators.required]);

    this.userRegisterForm = this.formBuilder.group({
      username: new FormControl(null, [Validators.required]),
      passwords: new FormGroup({
        password: this.password,
        rePassword: new FormControl(null, [Validators.required]),
      }),
    });
  }

  handleUserRegister() {}
}
