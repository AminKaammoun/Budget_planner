import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberFormComponent } from './member-form/member-form.component';
import { MemberComponent } from './member/member.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToolsComponent } from './tools/tools.component';
import { ArticlesComponent } from './articles/articles.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { TestComponent } from './test/test.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  {
    path:'members',
    pathMatch:'full',
    component: MemberComponent
  },
  {
    path: 'create',
    pathMatch: 'full',
    component: MemberFormComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: ':id/edit',
    pathMatch: 'full',
    component: MemberFormComponent
  },
  {
    path:'dashboard',
    pathMatch:'full',
    component: DashboardComponent
  },
  {
    path:'tool',
    pathMatch:'full',
    component: ToolsComponent
  },
  {
    path:'articles',
    pathMatch:'full',
    component: ArticlesComponent
  },
  {
    path:'createArticles',
    pathMatch:'full',
    component: ArticleFormComponent
  },
  {
    path:'id/article/edit',
    pathMatch:'full',
    component: ArticleFormComponent
  },
  {
    path:'event',
    pathMatch:'full',
    component: EventsComponent
  },
  {
    path:'login',
    pathMatch:'full',
    component: LoginComponent
  },
  {
    path:'test',
    pathMatch:'full',
    component: TestComponent
  },
  {
    path:'transactions',
    pathMatch:'full',
    component: TransactionComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
