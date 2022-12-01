import { Component, Input } from '@angular/core';

import { IAgency } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent {
  @Input() agencyData!: IAgency;

  default = 'Not Added...';

  constructor() {}
}
