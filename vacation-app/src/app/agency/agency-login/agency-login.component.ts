import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AgencyService } from '../agency.service';

@Component({
  selector: 'app-agency-login',
  templateUrl: './agency-login.component.html',
  styleUrls: ['./agency-login.component.css'],
})
export class AgencyLoginComponent {
  constructor(private agencyService: AgencyService, private router: Router) {}

  handleAgencyLogin(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }

    const body = {
      email: loginForm.value['email'],
      password: loginForm.value['password'],
    };

    this.agencyService.agencyLogin$(body).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        loginForm.reset()
      }
    });
  }
}
