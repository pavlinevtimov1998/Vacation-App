import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { AuthService } from 'src/app/auth.service';
import { errorHandler } from '../../../util/form-errors';

@Component({
  selector: 'app-agency-login',
  templateUrl: './agency-login.component.html',
  styleUrls: ['./agency-login.component.css'],
})
export class AgencyLoginComponent implements OnInit {
  agencyLoginForm!: FormGroup;

  get errHandler() {
    return errorHandler;
  }

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.agencyLoginForm = this.formBuilder.group({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  handleAgencyLogin() {
    if (this.agencyLoginForm.invalid) {
      return this.agencyLoginForm.markAllAsTouched();
    }

    const body = {
      email: this.agencyLoginForm.value['email'],
      password: this.agencyLoginForm.value['password'],
    };

    this.authService.agencyLogin$(body).subscribe({
      next: (agency) => {
        this.authService.handleLogin(agency);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
