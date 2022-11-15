import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  exports: [MatIconModule, MatButtonModule, MatDialogModule],
})
export class MaterialModule {}
