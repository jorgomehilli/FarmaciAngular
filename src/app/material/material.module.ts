import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatSnackBarModule,
  MatDialogModule
} from '@angular/material';

const MaterialComponents = [
  MatButtonModule,
  MatSnackBarModule,
  MatDialogModule
];

@NgModule({
  declarations: [],
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
