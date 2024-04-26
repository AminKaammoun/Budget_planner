import { Component , Inject, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from 'src/Services/transaction.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryService } from 'src/Services/category.service';
import { Category } from 'src/Modeles/Category';


@Component({
  selector: 'app-transaction-form-add',
  templateUrl: './transaction-form-add.component.html',
  styleUrls: ['./transaction-form-add.component.css']
})
export class TransactionFormAddComponent {
  form !: FormGroup;
  categories: Category[] = [];


  constructor(private MS: TransactionService, private CS: CategoryService,private router: Router ,private dialogRef: MatDialogRef<TransactionFormAddComponent>, @Inject(MAT_DIALOG_DATA) data:any) {
  

  }

ngOnInit(): void {
  this.loadCategories();
   
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

save(): void {
  if (this.form.valid) {
    const formData = this.form.value;
    
    // Format the date to YYYY-MM-DD
    const formattedDate = this.formatDate(formData.date);
    formData.date = formattedDate;

    this.dialogRef.close(formData);

   
  }
}

formatDate(inputDate: string): string {
  const date = new Date(inputDate);
  const day = date.getUTCDate(); 
  const month = date.getUTCMonth() + 1; 
  const year = date.getUTCFullYear(); 

  const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

  return formattedDate;
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
    createdDate: new FormControl(null, [Validators.required]),
  })
} 





}

