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
  
  constructor(public dialog: MatDialog) {} 
  
  openDialog(): void { 
    this.dialog.open(GroupCreationDialogComponent); 
  }
}
