import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  handleOptionBtn(
    addClass: HTMLElement,
    removeClass: HTMLElement,
    hide: HTMLElement,
    show: HTMLElement
  ) {
    addClass.classList.add('selected');
    removeClass.classList.remove('selected');

    hide.style.display = 'none';
    show.style.display = 'block';
  }
}
