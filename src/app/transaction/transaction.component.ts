import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild} from '@angular/core';
import { TransactionService } from 'src/Services/transaction.service';
import { Transaction } from 'src/Modeles/Transaction';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit{

  displayedColumns: string[] = ['id', 'type', 'category', 'description','amount','createdDate','action'];
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
   
  }

  constructor(private MS: TransactionService, private dialog:MatDialog) { 
  
  }
  dataSource = new MatTableDataSource<Transaction>();

  ngOnInit(): void{
      this.getTransactions();
  }

  getTransactions(){
    this.MS.GetAll().subscribe((r)=>{
      this.dataSource = new MatTableDataSource<Transaction>(r);
    })
  }

  delete(id: string): void {
  
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height : '200px',
      width: '300px',
    });
    //2 attendre le resultat de user
    dialogRef.afterClosed().subscribe(result => {
      if(result)
       //1 lancer la boite
    this.MS.onDelete(id).subscribe(() => {
      this.getTransactions();
    });
    
    });
    
    //3 if(confirm)
    //appeler le fonciton de service ondelete()


  }

  onEdit(id : string){
    //ouvrir le modal [ArticleFormComponent]
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.MS.getTransactionById(id).subscribe((transaction: Transaction) => {
     
    dialogConfig.data =  transaction;
    
    
    
    this.dialog.open(TransactionFormComponent, dialogConfig)})
  }




  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
 

    const dialogRef = this.dialog.open(TransactionFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data);
        this.MS.OnSave(data).subscribe(() => { 
          this.dataSource.data = this.MS.tab;
        });
      }
    );
}
}

