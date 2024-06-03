import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

import { LoginComponent } from './login/login.component';

import { TransactionComponent } from './transaction/transaction.component';
import { CategoryComponent } from './category/category.component';
import { GoalComponent } from './goal/goal.component';
import { authGuard } from './Auth.guard';

const routes: Routes = [
  
  {
    path:'categories',
    pathMatch:'full',
    component: CategoryComponent,
    canActivate: [authGuard]
  },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  
  {
    path:'dashboard',
    pathMatch:'full',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
 
  {
    path:'login',
    pathMatch:'full',
    component: LoginComponent
  },

  {
    path:'transactions',
    pathMatch:'full',
    component: TransactionComponent,
    canActivate: [authGuard]
  },

  {
    path:'goals',
    pathMatch:'full',
    component: GoalComponent,
    canActivate: [authGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
