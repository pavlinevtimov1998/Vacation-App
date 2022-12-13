import { Component } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  get isLogged$() {
    return this.authService.isLogged$;
  }

  constructor(private authService: AuthService) {}
}
