import { Component , Inject, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/Services/category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-category-form-edit',
  templateUrl: './category-form-edit.component.html',
  styleUrls: ['./category-form-edit.component.css']
})
export class CategoryFormEditComponent implements OnInit{
  form !: FormGroup;
  name: string;
  id: string;


  constructor(private MS: CategoryService, private router: Router, private dialogRef: MatDialogRef<CategoryFormEditComponent>, @Inject(MAT_DIALOG_DATA) data:any) {
  
    this.name = data.name;
    this.id = data.id;

  }

ngOnInit(): void {
    this.initForm();
}

save() {
  this.MS.updateCategory(this.id,this.form.value).subscribe((r)=>{
    this.dialogRef.close(this.form.value);
  })
  
}


close() {
  this.dialogRef.close();
}

  
initForm(): void {
  this.form = new FormGroup({
    
   name: new FormControl(this.name, [Validators.required]),
 
  })
} 





}

