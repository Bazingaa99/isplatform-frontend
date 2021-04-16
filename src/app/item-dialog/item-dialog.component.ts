import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemCreationDialogComponent } from '../item-creation-dialog/item-creation-dialog.component';
import { Item } from '../shared/item';

@Component({
  selector: 'item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.scss']
})
export class ItemDialogComponent implements OnInit {
  
  constructor( public updateDialog: MatDialog,
               public itemDialog: MatDialogRef<ItemDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public item: Item ) { }

  ngOnInit(): void {
  }

  checkIfUserIsOwner(): boolean {
    if(this.item.owner['email'] === localStorage.getItem('email')){
      return true;
    } else {
      return false;
    }
  }

  openItemUpdateDialog(itemData): void {
    this.updateDialog.open(ItemCreationDialogComponent, {
      data: itemData,
    });
  }

  closeItemDialog(): void {
    this.itemDialog.close(ItemDialogComponent);
  }
}
