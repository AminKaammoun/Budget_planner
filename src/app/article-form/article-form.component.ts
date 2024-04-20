import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { ArticleService } from 'src/Services/article.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/Modeles/Member';
import { Article } from 'src/Modeles/Article';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {
  //injection des dependances
  constructor(private MS: ArticleService, private router: Router, private activatedroute: ActivatedRoute) {

  }
  idcourant!: string;
  form!: FormGroup;

  ngOnInit(): void {

    // 1. recuperer id de url
    this.idcourant = this.activatedroute.snapshot.params['id']
    // 2. tester sur id 

    // 3. si id existe => {je suis dans edit
    //getMemberById(ID)
    // initForm2(m)
    if (!!this.idcourant) {


      this.MS.getArticleById(this.idcourant).subscribe(m => {

        this.initForm2(m);
      });
    }
    //4. sinon je suis dans create => initForm();
    else {
      this.initForm();
    }
  }

  onSub(): void {
    if (!!this.idcourant) {
      this.MS.updateMember(this.idcourant, this.form.value).subscribe(() => {
        this.router.navigate(['/articles'])
      })
    }
    else {
      // recuperation des donnée entré par le user
      console.log(this.form.value)
      //appeler la fonction onSave(this.form.value)) du service MmeberService
      const memberToSave = this.form.value;
      this.MS.OnSave(memberToSave).subscribe(() => {
        this.router.navigate(['/articles'])
      })
    }
  }
  initForm(): void {
    this.form = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
      titre: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
    })
  }

  initForm2(m: Article): void {
   
    this.form = new FormGroup({
      id: new FormControl(m.id, [Validators.required]),
      type: new FormControl(m.type, [Validators.required]),
      titre: new FormControl(m.titre, [Validators.required]),
      date: new FormControl(m.date, [Validators.required]),
    })
  }
}
