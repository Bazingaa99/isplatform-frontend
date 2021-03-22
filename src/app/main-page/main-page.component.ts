import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemCreationDialogComponent } from '../item-creation-dialog/item-creation-dialog.component';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  showOutlet: boolean;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openItemDialog(): void {
    this.dialog.open(ItemCreationDialogComponent);
  }
}
