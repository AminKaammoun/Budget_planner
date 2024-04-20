import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from 'src/Services/article.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Article } from 'src/Modeles/Article';



@Component({
  selector: 'app-article-form2',
  templateUrl: './article-form2.component.html',
  styleUrls: ['./article-form2.component.css'],
  
  
})
export class ArticleForm2Component implements OnInit{
  form !: FormGroup;
  titre : string;
  type : string;
  date : string;

  constructor(private MS: ArticleService, private router: Router, private dialogRef: MatDialogRef<ArticleForm2Component>, @Inject(MAT_DIALOG_DATA) data:any) {
    this.titre = data.titre;
    this.type = data.type;
    this.date = data.date;
    console.log(this.titre);
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
    titre: new FormControl(this.titre, [Validators.required]),
    date: new FormControl(this.date, [Validators.required]),
  })
} 




}

