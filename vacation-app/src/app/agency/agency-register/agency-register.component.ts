import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { passwordsMismatch } from '../../util/form-errors';
import { AgencyService } from '../agency.service';

@Component({
  selector: 'app-agency-register',
  templateUrl: './agency-register.component.html',
  styleUrls: ['./agency-register.component.css'],
})
export class AgencyRegisterComponent {
  constructor(private agencyService: AgencyService, private router: Router) {}

  handleAgencyRegister(registerForm: NgForm) {
    if (registerForm.invalid) {
      return;
    }

    const body = {
      email: registerForm.value['email'],
      agencyName: registerForm.value['agencyName'],
      password: registerForm.value['password'],
      rePassword: registerForm.value['rePassword'],
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
