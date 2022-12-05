import { Component, Input, OnInit } from '@angular/core';
import { IOffer } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-more-offers',
  templateUrl: './more-offers.component.html',
  styleUrls: ['./more-offers.component.css'],
})
export class MoreOffersComponent implements OnInit {
  @Input() moreOffersFromAgency!: IOffer[];
  @Input() agencyName!: string;

  constructor() {}

  ngOnInit(): void {}
}
