import { Component , Inject, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/Services/category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GoalService } from 'src/Services/GoalService';

@Component({
  selector: 'app-goal-form-add',
  templateUrl: './goal-add.component.html',
  styleUrls: ['./goal-add.component.css']
})
export class GoalAddComponent {
  form !: FormGroup;


  constructor(private GS: GoalService, private router: Router, private dialogRef: MatDialogRef<GoalAddComponent>, @Inject(MAT_DIALOG_DATA) data:any) {
  

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
    
    desc : new FormControl(null, [Validators.required]),
    amount : new FormControl(null, [Validators.required])
  
  })
} 





}

