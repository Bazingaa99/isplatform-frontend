import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from '../shared/item';

@Component({
  selector: 'item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.scss']
})
export class ItemDialogComponent implements OnInit {
  
  constructor( public dialog: MatDialogRef<ItemDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public item: Item ) { }

  ngOnInit(): void {
  }

  closeItemDialog(): void {
    this.dialog.close(ItemDialogComponent);
  }
}
