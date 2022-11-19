import { Component, Input, OnInit } from '@angular/core';
import { IAccount } from 'src/app/shared/interfaces/account.interface';

@Component({
  selector: 'app-agency-offers',
  templateUrl: './agency-offers.component.html',
  styleUrls: ['./agency-offers.component.css'],
})
export class AgencyOffersComponent implements OnInit {
  @Input() profile!: IAccount;
  @Input() currentUser!: IAccount;
  @Input() isOwnerOfProfile!: boolean;

  constructor() {}

  ngOnInit(): void {}
}
