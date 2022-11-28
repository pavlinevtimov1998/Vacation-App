import { Component, Input, OnInit } from '@angular/core';

import { IAgency } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  @Input() agencyData!: IAgency;

  default = 'Not Added...'

  constructor() {}

  ngOnInit(): void {}
}
