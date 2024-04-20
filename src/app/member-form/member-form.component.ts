import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { MemberService } from 'src/Services/member.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/Modeles/Member';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {
  //injection des dependances
  constructor(private MS: MemberService, private router: Router, private activatedroute: ActivatedRoute) {

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


      this.MS.getMemberById(this.idcourant).subscribe(m => {

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
        this.router.navigate(['/members'])
      })
    }
    else {
      // recuperation des donnée entré par le user
      console.log(this.form.value)
      //appeler la fonction onSave(this.form.value)) du service MmeberService
      const memberToSave = this.form.value;
      this.MS.OnSave(memberToSave).subscribe(() => {
        this.router.navigate(['/members'])
      })
    }
  }
  initForm(): void {
    this.form = new FormGroup({
      cin: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      cv: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
    })
  }

  initForm2(m: Member): void {
    this.form = new FormGroup({
      cin: new FormControl(m.cin, [Validators.required]),
      name: new FormControl(m.name, [Validators.required]),
      cv: new FormControl(m.cv, [Validators.required]),
      type: new FormControl(m.type, [Validators.required]),
    })
  }
}
