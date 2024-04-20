import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>){

  }
  title = 'Delete Member';
  content ='Are you sure you want to delete this item?'; 
  Cancel = 'Cancel';
  Delete = 'Delete';
}
 