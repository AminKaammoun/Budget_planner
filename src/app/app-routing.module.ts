import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

import { LoginComponent } from './login/login.component';

import { TransactionComponent } from './transaction/transaction.component';
import { CategoryComponent } from './category/category.component';
import { GoalComponent } from './goal/goal.component';

const routes: Routes = [
  
  {
    path:'categories',
    pathMatch:'full',
    component: CategoryComponent
  },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  
  {
    path:'dashboard',
    pathMatch:'full',
    component: DashboardComponent
  },
 
  {
    path:'login',
    pathMatch:'full',
    component: LoginComponent
  },

  {
    path:'transactions',
    pathMatch:'full',
    component: TransactionComponent
  },

  {
    path:'goals',
    pathMatch:'full',
    component: GoalComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
