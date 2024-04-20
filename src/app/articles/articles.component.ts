import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/Services/article.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild} from '@angular/core';
import { ArticleForm2Component } from '../article-form2/article-form2.component';
import { Article } from 'src/Modeles/Article';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})


export class ArticlesComponent implements OnInit{
  displayedColumns: string[] = ['id', 'type', 'titre', 'date','action'];
 
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

  constructor(private MS: ArticleService, private dialog:MatDialog) { 
  
  }
  dataSource = new MatTableDataSource<Article>();

  ngOnInit(): void{
      this.getArticles();
  }

  getArticles(){
    this.MS.GetAll().subscribe((r)=>{
      this.dataSource = new MatTableDataSource<Article>(r);
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
      this.getArticles();
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
    this.MS.getArticleById(id).subscribe((article: Article) => {
     
    dialogConfig.data =  article;
    
    
    
    this.dialog.open(ArticleForm2Component, dialogConfig)})
  }




  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
 

    const dialogRef = this.dialog.open(ArticleForm2Component, dialogConfig);
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
