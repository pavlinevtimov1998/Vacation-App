import { Component, Input, OnInit } from '@angular/core';
import { IAccount } from 'src/app/shared/interfaces/account.interface';

@Component({
  selector: 'app-reserved-vacations',
  templateUrl: './reserved-vacations.component.html',
  styleUrls: ['./reserved-vacations.component.css'],
})
export class ReservedVacationsComponent implements OnInit {
  @Input() profile!: IAccount;
  @Input() currentUser!: IAccount;
  @Input() isOwnerOfProfile!: boolean;

  constructor() {}

  ngOnInit(): void {}
}
