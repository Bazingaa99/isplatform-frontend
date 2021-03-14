import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemCreationDialogComponent } from '../item-creation-dialog/item-creation-dialog.component';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openItemDialog(): void {
    this.dialog.open(ItemCreationDialogComponent);
  }

}
