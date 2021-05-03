import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ItemService } from '../services/item.service';
import { UpdateUsersGroupsService } from '../services/update-users-group.service';
import { Request } from '../shared/request';

@Component({
  selector: 'bookmarked-item-dialog',
  templateUrl: './bookmarked-item-dialog.component.html',
  styleUrls: ['./bookmarked-item-dialog.component.scss']
})
export class BookmarkedItemDialogComponent implements OnInit {
  currentUserEmail: string
  isBookmarked: boolean
  request: Request
  bookmarkCount: number
  constructor(public itemService: ItemService,
              public snackBar: MatSnackBar,
              public bookmarkedItemDialog: MatDialogRef<BookmarkedItemDialogComponent>,
              private updateService: UpdateUsersGroupsService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                data['item'] = data['0']
                delete data['0']
                data['itemRequested'] = data['1']
                delete data['1']
                data['responded'] = data['2']
                delete data['2']
                data['accepted'] = data['3']
                delete data['3']
                this.currentUserEmail = localStorage.getItem('email');
                this.isItemBookmarkedByCurrentUser();
                this.bookmarkCount = data.item.bookmarkCount;
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

  public requestItem(itemId: number): void {
    this.request = {
      item: itemId
    }
    this.itemService.requestItem(this.request, localStorage.getItem('email')).subscribe(
      (response: Request) => {
        this.closeBookmarkedItemDialog();
        this.updateService.sendUpdate();
        this.snackBar.open("Item requested.","✓",{
          duration: 400000000000000,
          panelClass: ['green-snackbar']
        })
      },
      (error: HttpErrorResponse) => {
        console.log(error)
        this.snackBar.open("Could not request item, please try again.","✓",{
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
        this.isBookmarked = true;
        this.bookmarkCount++;
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
        this.isBookmarked = false;
        this.bookmarkCount--;
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

  closeBookmarkedItemDialog(): void {
    this.bookmarkedItemDialog.close(BookmarkedItemDialogComponent);
  }

}
