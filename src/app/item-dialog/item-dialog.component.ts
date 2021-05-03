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
  isBookmarked: boolean;

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
                  this.currentUserEmail = localStorage.getItem('email')
                  this.isItemBookmarkedByCurrentUser();
                }

  ngOnInit(): void {

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

  public isItemBookmarkedByCurrentUser(): void {
    this.itemService.isBookmarkedByCurrentUser(this.data.item.id, this.currentUserEmail).subscribe(
      (response: boolean) => {
        this.isBookmarked = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error)
        this.snackBar.open("Could not check if item is bookmarked.","✓",{
          duration: 400000000000000,
          panelClass: ['red-snackbar']
        })
      }
    )
  }

  public bookmarkItem(itemId: number): void {
    this.itemService.bookmarkItem(itemId, this.currentUserEmail).subscribe(
      (response: object) => {
        console.log(response);
        this.updateService.sendUpdate();
        this.snackBar.open("Item bookmarked.","✓",{
          duration: 400000000000000,
          panelClass: ['green-snackbar']
        })
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.snackBar.open("Could not bookmark item. Please try again.","✓",{
          duration: 400000000000000,
          panelClass: ['red-snackbar']
        })
      }
    )
  }

  public deleteBookmark(itemId: number): void {
    this.itemService.deleteBookmark(itemId, this.currentUserEmail).subscribe(
      (response: object) => {
        console.log(response)
        this.updateService.sendUpdate();
        this.snackBar.open("Item was removed from bookmarks.","✓",{
          duration: 400000000000000,
          panelClass: ['green-snackbar']
        })
      },
      (error: HttpErrorResponse) => {
        console.log(error)
        this.snackBar.open("Could not remove item from bookmarks. Please try again.","✓",{
          duration: 400000000000000,
          panelClass: ['red-snackbar']
        })
      }
    )
  }
}
