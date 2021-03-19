import { Component, OnInit } from '@angular/core';
import { ItemCreationDialogComponent } from '../item-creation-dialog/item-creation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  showProfileSidebar:boolean=false;

  ngOnInit(): void {
  }

  toggleProfileSidebar() {
    this.showProfileSidebar=!this.showProfileSidebar;
  }

  openItemDialog(): void {
    this.dialog.open(ItemCreationDialogComponent);
  }
}
