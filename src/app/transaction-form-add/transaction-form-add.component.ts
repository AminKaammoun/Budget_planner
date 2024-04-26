import { Component , Inject, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from 'src/Services/transaction.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-transaction-form-add',
  templateUrl: './transaction-form-add.component.html',
  styleUrls: ['./transaction-form-add.component.css']
})
export class TransactionFormAddComponent {
  form !: FormGroup;


  constructor(private MS: TransactionService, private router: Router, private dialogRef: MatDialogRef<TransactionFormAddComponent>, @Inject(MAT_DIALOG_DATA) data:any) {
  

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
    
    type: new FormControl(null, [Validators.required]),
    category: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    amount: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required]),
  })
} 





}

