import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild} from '@angular/core';
import { GoalService } from 'src/Services/GoalService';
import { Goal } from 'src/Modeles/Goal';
import { CategoryFormEditComponent } from '../category-form-edit/category-form-edit.component';
import { GoalAddComponent } from '../goal-add/goal-add.component';
@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit{

  displayedColumns: string[] = ['id', 'desc','amount','action'];
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
   
  }

  constructor(private GS: GoalService, private dialog:MatDialog) { 
  
  }
  dataSource = new MatTableDataSource<Goal>([]);


  ngOnInit(): void{
    this.dataSource.paginator = this.paginator;
      this.getGoals();
  }

  getGoals(): void {
    this.GS.GetAll().subscribe((goals: Goal[]) => {
      this.dataSource.data = goals; 
      this.dataSource.paginator = this.paginator; 
    });
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
    this.GS.onDelete(id).subscribe(() => {
      this.getGoals();
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
    this.GS.getGoalById(id).subscribe((goal: Goal) => {
     
    dialogConfig.data =  {
      desc : goal.desc,
      amount : goal.desc,
      id : id
    };
    
    
    
    this.dialog.open(CategoryFormEditComponent, dialogConfig)})
  }




  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
 

    const dialogRef = this.dialog.open(GoalAddComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data);
        this.GS.OnSave(data).subscribe(() => { 
          this.dataSource.data = this.GS.tab;
        });
      }
    );
}
}

