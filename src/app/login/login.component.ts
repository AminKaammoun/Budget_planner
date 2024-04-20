import { Component } from '@angular/core';
import { AuthService } from 'src/Services/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private AS :AuthService, private router : Router){}
  signin(){
    this.AS.doGoogleLogin().then(()=>{
      this.router.navigate(['/dashboard'])
    });
  }
}
