import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemCreationDialogComponent } from '../item-creation-dialog/item-creation-dialog.component';
import { Item } from '../shared/item';
import { RequestService } from '../services/request.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Request } from '../shared/request';
import { ItemService } from '../services/item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.scss']
})
export class ItemDialogComponent implements OnInit {
  currentUserEmail: string;
  isItemRequested: boolean;
  request: Request;

  constructor( public updateDialog: MatDialog,
                public itemDialog: MatDialogRef<ItemDialogComponent>,
                public requestService: RequestService,
                public itemService: ItemService,
                public router: Router,
                @Inject(MAT_DIALOG_DATA) public data: any ) {
                  data['item'] = data['0']
                  delete data['0']
                  data['isItemRequested'] = data['1']
                  delete data['1']
                  console.log(data['isItemRequested'])
                }

  ngOnInit(): void {
    this.currentUserEmail = localStorage.getItem('email')
  }

  checkIfUserIsOwner(): boolean {
    if(this.data.item.owner['email'] === this.currentUserEmail){
      return true;
    } else {
      return false;
    }
  }

  openItemUpdateDialog(itemData): void {
    console.log(itemData);
    this.updateDialog.open(ItemCreationDialogComponent, {
      data: itemData,
    });
  }

  closeItemDialog(): void {
    this.itemDialog.close(ItemDialogComponent);
  }

  public requestItem(itemId: number): void {

    this.request = {
      item: itemId
    }
    this.itemService.requestItem(this.request, localStorage.getItem('email')).subscribe(
      (response: Request) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }
}
