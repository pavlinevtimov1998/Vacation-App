import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from 'src/app/shared/dialog/auth-dialog.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  signUpDialogHandler() {
    this.dialog.open(AuthDialogComponent, {
      width: '400px',
      height: '300px',
    });
  }
}
