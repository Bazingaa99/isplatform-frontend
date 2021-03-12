import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { GroupCreationDialogComponent } from '../group-creation-dialog/group-creation-dialog.component'; 


@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  rigtSidebarIsShown = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  
  openDialog(): void { 
    this.dialog.open(GroupCreationDialogComponent); 
  }

}
