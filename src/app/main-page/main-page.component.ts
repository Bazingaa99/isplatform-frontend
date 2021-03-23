import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GroupCreationDialogComponent } from '../group-creation-dialog/group-creation-dialog.component';
import { ItemCreationDialogComponent } from '../item-creation-dialog/item-creation-dialog.component';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openItemDialog(): void {
    this.dialog.open(ItemCreationDialogComponent);
  }
  
  openGroupDialog(): void {
    this.dialog.open(GroupCreationDialogComponent);
  }

  
}
