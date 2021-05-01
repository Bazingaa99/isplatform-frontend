import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemCreationDialogComponent } from '../item-creation-dialog/item-creation-dialog.component';
import { Item } from '../shared/item';
import { RequestService } from '../services/request.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Request } from '../shared/request';
import { ItemService } from '../services/item.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateUsersGroupsService } from '../services/update-users-group.service';
import { ItemDeleteDialogComponent } from '../item-delete-dialog/item-delete-dialog.component';

@Component({
  selector: 'item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.scss']
})
export class ItemDialogComponent implements OnInit {
  currentUserEmail: string;
  request: Request;

  constructor( public updateDialog: MatDialog,
                public itemDialog: MatDialogRef<ItemDialogComponent>,
                public requestService: RequestService,
                public itemService: ItemService,
                public router: Router,
                private updateService: UpdateUsersGroupsService,
                private snackBar: MatSnackBar,
                @Inject(MAT_DIALOG_DATA) public data: any ) {
                  console.log(data);
                  data['item'] = data['0']
                  delete data['0']
                  data['itemRequested'] = data['1']
                  delete data['1']
                  data['responded'] = data['2']
                  delete data['2']
                  data['accepted'] = data['3']
                  delete data['3']
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
    this.updateDialog.open(ItemCreationDialogComponent, {
      data: itemData,
    });
  }
  public checkIfImageIsSet (item: Item):boolean{    
    return item.imageName===null   
  }
  openItemDeleteDialog(itemId: number): void {
    this.updateDialog.open(ItemDeleteDialogComponent, {
      data: itemId,
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
        this.updateService.sendUpdate();
        this.snackBar.open("Item requested.","✓",{
          duration: 400000000000000,
          panelClass: ['green-snackbar']
        })
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open("Could not request item, please try again.","✓",{
          duration: 400000000000000,
          panelClass: ['red-snackbar']
        })
      }
    )
  }
}
