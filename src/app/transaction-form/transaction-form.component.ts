import { Component , Inject, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from 'src/Services/transaction.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryService } from 'src/Services/category.service';
import { Category } from 'src/Modeles/Category';

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
  createdDate: string;
  id: string;

  categories: Category[] = [];

  constructor(private MS: TransactionService, private CS : CategoryService,private router: Router, private dialogRef: MatDialogRef<TransactionFormComponent>, @Inject(MAT_DIALOG_DATA) data:any) {
  
    this.type = data.type;
    this.createdDate = data.date;
    this.category = data.category;
    this.description = data.description;
    this.amount = data.amount;
    this.id = data.id;

  }

ngOnInit(): void {
  this.loadCategories();
}

save() {
  
  
  this.MS.updateTransaction(this.id,this.form.value).subscribe((r)=>{
    this.dialogRef.close(this.form.value);
  })
  console.log(this.form.value);
  
}

loadCategories(): void {
  this.CS.GetAll().subscribe(
    (data: Category[]) => {
      this.categories = data;
      console.log('Categories:', this.categories);
      this.initForm(); 
    },
    (error) => {
      console.error('Error loading categories:', error);
    
    }
  );
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
    createdDate: new FormControl(this.createdDate, [Validators.required]),
  })
} 





}

