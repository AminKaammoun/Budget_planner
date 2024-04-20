import { Component } from '@angular/core';
import { GLOBAL } from '../app-config';
import { Member } from 'src/Modeles/Member';
import { MemberService } from 'src/Services/member.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent {
  nom = 'Amine'
  displayedColumns: string[] = ['id', 'cin', 'name', 'cv', 'type', 'createdDate', 'action'];
  //injection de dependances

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private MS: MemberService, private dialog:MatDialog) { }
  dataSource = new MatTableDataSource(this.MS.tab);

  delete(id: string): void {
    //1 lancer la boite
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height : '200px',
      width: '300px',
    });
    //2 attendre le resultat de user
    dialogRef.afterClosed().subscribe(result => {
      if(result)
      this.MS.onDelete(id).subscribe(() => {
        this.dataSource.data = this.MS.tab
      });
    });
    
    //3 if(confirm)
    //appeler le fonciton de service ondelete()


  }
}
