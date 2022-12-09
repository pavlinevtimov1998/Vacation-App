import { Component, Input, OnInit } from '@angular/core';
import { IComment } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-offer-comments',
  templateUrl: './offer-comments.component.html',
  styleUrls: ['./offer-comments.component.css']
})
export class OfferCommentsComponent implements OnInit {
  @Input() comments!: IComment[];

  constructor() { }

  ngOnInit(): void {
  }

}
