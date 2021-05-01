import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ItemService } from '../services/item.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Item } from '../shared/item';
import { Subscription } from 'rxjs';
import { UpdateUsersGroupsService } from '../services/update-users-group.service';
import { MatDialog } from '@angular/material/dialog';
import { BookmarkedItemDialogComponent } from '../bookmarked-item-dialog/bookmarked-item-dialog.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'bookmarked-items',
  templateUrl: './bookmarked-items.component.html',
  styleUrls: ['./bookmarked-items.component.scss']
})
export class BookmarkedItemsComponent implements OnInit {
  currentUserEmail: string;
  public items: Item[];
  public itemsLength: number;
  public pageSize: number;
  public pageSlice;
  public updateEventSubscription: Subscription;
  public loadPage: boolean;
  constructor(public itemService: ItemService,
              public snackBar: MatSnackBar,
              private updateService: UpdateUsersGroupsService,
              private dialog: MatDialog) {
                this.updateEventSubscription = this.updateService.getUpdate().subscribe(()=>{
                  this.getBookmarkedItems();
                });
              }

  ngOnInit(): void {
    this.loadPage = false;
    this.currentUserEmail = localStorage.getItem('email');
    this.getBookmarkedItems();
  }

  public getBookmarkedItems(): void {
    this.itemService.getItemsBookmarkedByUser(this.currentUserEmail).subscribe(
      (response: Item[]) => {
        console.log(response);
        this.items = response;
        this.itemsLength = this.items.length;
        this.loadPage = true;
        this.pageSlice = this.items.slice(0, this.pageSize);
      },
      (error: HttpErrorResponse) => {
        console.log(error)
        this.snackBar.open("Could not get bookmarked items.","✓",{
          duration: 400000000000000,
          panelClass: ['red-snackbar']
        })
      }
    )
  }

  public onPageChange(event: PageEvent){
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if(endIndex > this.items.length){
      endIndex = this.items.length;
    }

    this.pageSlice = this.items.slice(startIndex, endIndex);
  }

  openItemDialog(item): void {
    this.dialog.open(BookmarkedItemDialogComponent, {
      data: item,
    });
  }

  public checkIfImageIsSet (item: Item):boolean{
    return item.imageName===null
  }
}
