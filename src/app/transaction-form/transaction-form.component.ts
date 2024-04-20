import { Component , Inject, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from 'src/Services/transaction.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent implements OnInit{
  form !: FormGroup;
  type: string;
  category: string;
  description : string;
  amount: number;
  date: string;

  constructor(private MS: TransactionService, private router: Router, private dialogRef: MatDialogRef<TransactionFormComponent>, @Inject(MAT_DIALOG_DATA) data:any) {
  
    this.type = data.type;
    this.date = data.date;
    this.category = data.category;
    this.description = data.description;
    this.amount = data.amount;

  }

ngOnInit(): void {
    this.initForm();
}

save() {
  this.dialogRef.close(this.form.value);
  
}


close() {
  this.dialogRef.close();
}

  
initForm(): void {
  this.form = new FormGroup({
    
    type: new FormControl(this.type, [Validators.required]),
    category: new FormControl(this.category, [Validators.required]),
    description: new FormControl(this.description, [Validators.required]),
    amount: new FormControl(this.amount, [Validators.required]),
    date: new FormControl(this.date, [Validators.required]),
  })
} 





}

