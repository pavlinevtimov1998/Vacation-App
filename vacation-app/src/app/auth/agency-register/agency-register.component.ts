import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { MessageBusService } from 'src/app/message-bus.service';
import { MessageType } from 'src/app/shared/interfaces';
import { AgencyService } from '../../agency/agency.service';

@Component({
  selector: 'app-agency-register',
  templateUrl: './agency-register.component.html',
  styleUrls: ['./agency-register.component.css'],
})
export class AgencyRegisterComponent {
  isLoading = false;
  
  constructor(
    private agencyService: AgencyService,
    private router: Router,
    private messageBus: MessageBusService
  ) {}

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

    this.isLoading = true;

    this.agencyService.agencyRegister$(body).subscribe({
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
