import { Component , Inject, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/Services/category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-form-add',
  templateUrl: './category-form-add.component.html',
  styleUrls: ['./category-form-add.component.css']
})
export class CategoryFormAddComponent {
  form !: FormGroup;


  constructor(private MS: CategoryService, private router: Router, private dialogRef: MatDialogRef<CategoryFormAddComponent>, @Inject(MAT_DIALOG_DATA) data:any) {
  

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
    
    name : new FormControl(null, [Validators.required]),
  
  })
} 





}

