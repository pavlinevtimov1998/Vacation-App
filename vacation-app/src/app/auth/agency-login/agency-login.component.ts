import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/auth.service';
import { errorHandler } from 'src/app/util/form-errors';
import { AgencyService } from '../agency.service';

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
    private agencyService: AgencyService,
    private formBuilder: FormBuilder,
    private router: Router
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

    this.agencyService.agencyLogin$(body).subscribe({
      next: (agency) => {
        this.authService.handleLogin(agency);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
