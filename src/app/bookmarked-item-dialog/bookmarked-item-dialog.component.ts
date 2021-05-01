import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ItemService } from '../services/item.service';
import { UpdateUsersGroupsService } from '../services/update-users-group.service';

@Component({
  selector: 'bookmarked-item-dialog',
  templateUrl: './bookmarked-item-dialog.component.html',
  styleUrls: ['./bookmarked-item-dialog.component.scss']
})
export class BookmarkedItemDialogComponent implements OnInit {
  currentUserEmail: string
  isBookmarked: boolean
  constructor(public itemService: ItemService,
              public snackBar: MatSnackBar,
              private updateService: UpdateUsersGroupsService,
              @Inject(MAT_DIALOG_DATA) public item: any) {
                this.currentUserEmail = localStorage.getItem('email');
                this.isItemBookmarkedByCurrentUser();
              }

  ngOnInit(): void {

  }

  public bookmarkItem(itemId: number): void {
    this.itemService.bookmarkItem(itemId, this.currentUserEmail).subscribe(
      (response: object) => {
        console.log(response);
        this.isBookmarked = true;
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
    this.itemService.isBookmarkedByCurrentUser(this.item.id, this.currentUserEmail).subscribe(
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

}
