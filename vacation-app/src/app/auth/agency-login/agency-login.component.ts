import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { MessageBusService } from 'src/app/message-bus.service';
import { MessageType } from 'src/app/shared/interfaces';
import { AgencyService } from '../../agency/agency.service';

@Component({
  selector: 'app-agency-login',
  templateUrl: './agency-login.component.html',
  styleUrls: ['./agency-login.component.css'],
})
export class AgencyLoginComponent {
  isLoading = false;

  constructor(
    private agencyService: AgencyService,
    private router: Router,
    private messageBus: MessageBusService
  ) {}

  handleAgencyLogin(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }

    const body = {
      email: loginForm.value['email'],
      password: loginForm.value['password'],
    };

    this.isLoading = true;

    this.agencyService.agencyLogin$(body).subscribe({
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
