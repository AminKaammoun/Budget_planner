import { Component } from '@angular/core';
import { AuthService } from 'src/Services/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  user !: any
  constructor(private AS: AuthService, private router: Router) {
    this.AS.getUserClaims().then((u) => {
      this.user = u;
      if(!!this.user)
      console.log(this.user.displayName);
    })
  }
  logout() {
    this.AS.doLogout().then(() => {
      this.router.navigate(['/'])
    });
  }
}
