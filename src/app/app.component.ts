import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { GroupCreationDialogComponent } from './group-creation-dialog/group-creation-dialog.component'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'itemsharingplatformapp';
  rigtSidebarIsShown = false;

  animal: string; 
  name: string; 
  
  constructor(public dialog: MatDialog) {} 
  
  openDialog(): void { 
    let dialogRef = this.dialog.open(GroupCreationDialogComponent, { 
      width: '250px', 
      data: { name: this.name, animal: this.animal } 
    }); 
  
    dialogRef.afterClosed().subscribe(result => { 
      this.animal = result; 
    }); 
  }
}
