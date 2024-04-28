import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTableModule} from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatButtonModule} from '@angular/material/button';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { LayoutComponent } from './layout/layout.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import{MatListModule} from '@angular/material/list'
import {MatMenuModule} from '@angular/material/menu';
import { DashboardComponent } from './dashboard/dashboard.component';

import { FirebaseModule } from './Firebase.module';
import { LoginComponent } from './login/login.component';
import {MatCardModule} from '@angular/material/card';

import { MatPaginatorModule } from '@angular/material/paginator';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatGridListModule} from '@angular/material/grid-list';

import { TransactionComponent } from './transaction/transaction.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { TransactionFormAddComponent } from './transaction-form-add/transaction-form-add.component';
import {MatSelectModule} from '@angular/material/select';
import { CategoryComponent } from './category/category.component';
import { CategoryFormAddComponent } from './category-form-add/category-form-add.component';
import { CategoryFormEditComponent } from './category-form-edit/category-form-edit.component';

@NgModule({
  declarations: [
   
    AppComponent,

    ConfirmDialogComponent,
    LayoutComponent,
    DashboardComponent,

    LoginComponent,


     TransactionComponent,
     TransactionFormComponent,
     TransactionFormAddComponent,
     CategoryComponent,
     CategoryFormAddComponent,
     CategoryFormEditComponent,
  ],
  imports: [
    MatSelectModule,
    MatGridListModule,
    FlexLayoutModule,
    MatIconModule,
    MatTableModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatSortModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    FirebaseModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
