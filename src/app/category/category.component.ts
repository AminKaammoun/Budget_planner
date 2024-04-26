import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild} from '@angular/core';
import { CategoryService } from 'src/Services/category.service';
import { Category } from 'src/Modeles/Category';
import { CategoryFormAddComponent } from '../category-form-add/category-form-add.component';
import { CategoryFormEditComponent } from '../category-form-edit/category-form-edit.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  displayedColumns: string[] = ['id', 'name','action'];
 
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

  constructor(private MS: CategoryService, private dialog:MatDialog) { 
  
  }
  dataSource = new MatTableDataSource<Category>([]);


  ngOnInit(): void{
    this.dataSource.paginator = this.paginator;
      this.getCategories();
  }

  getCategories(): void {
    this.MS.GetAll().subscribe((categories: Category[]) => {
      this.dataSource.data = categories; 
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
    this.MS.onDelete(id).subscribe(() => {
      this.getCategories();
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
    this.MS.getCategoryById(id).subscribe((category: Category) => {
     
    dialogConfig.data =  category;
    
    
    
    this.dialog.open(CategoryFormEditComponent, dialogConfig)})
  }




  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
 

    const dialogRef = this.dialog.open(CategoryFormAddComponent, dialogConfig);
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

