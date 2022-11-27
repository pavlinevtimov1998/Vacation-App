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
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth.service';
import { errorHandler, passwordsMismatch } from '../../util/form-errors';
import { AgencyService } from '../agency.service';

@Component({
  selector: 'app-agency-register',
  templateUrl: './agency-register.component.html',
  styleUrls: ['./agency-register.component.css'],
})
export class AgencyRegisterComponent implements OnInit {
  agencyRegisterForm!: FormGroup;
  password!: FormControl;

  get errHandler() {
    return errorHandler;
  }

  get passwordsGroup() {
    return this.agencyRegisterForm.controls['passwords'] as FormGroup;
  }

  constructor(
    private authService: AuthService,
    private agencyService: AgencyService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.password = new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]);

    this.agencyRegisterForm = this.formBuilder.group({
      email: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
      ]),
      agencyName: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25),
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

  handleAgencyRegister() {
    if (this.agencyRegisterForm.invalid) {
      return this.agencyRegisterForm.markAllAsTouched();
    }

    const body = {
      email: this.agencyRegisterForm.value['email'],
      agencyName: this.agencyRegisterForm.value['agencyName'],
      password: this.passwordsGroup.value['password'],
      rePassword: this.passwordsGroup.value['rePassword'],
    };

    this.agencyService.agencyRegister$(body).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
