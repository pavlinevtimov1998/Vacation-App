import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  openMobileNav(aside: HTMLElement) {
    aside.style.right = '0px';
  }

  closeMobileNav(aside: HTMLElement) {
    aside.style.right = '-300px';
  }
}
