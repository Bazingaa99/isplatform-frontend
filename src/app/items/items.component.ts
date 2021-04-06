import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../services/item.service';
import { Item } from '../shared/item';
import { PageEvent } from '@angular/material/paginator';
import { UpdateUsersGroupsService } from '../services/update-users-group.service';
import { Subscription } from 'rxjs';
import { ItemDialogComponent } from '../item-dialog/item-dialog.component';

@Component({
  selector: 'items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})

export class ItemsComponent implements OnInit {
  public items: Item[];
  public itemsLength: number;
  public pageSize: number;
  public pageSlice;
  public groupId: string;
  public updateEventSubscription: Subscription;

  constructor(public dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private itemService: ItemService,
              private router: Router,
              private updateService: UpdateUsersGroupsService) {
                this.updateEventSubscription = this.updateService.getUpdate().subscribe(()=>{
                  this.getItems();
                });
              }

  ngOnInit(): void {
    this.pageSize = 12;
    this.itemsLength = 0;
    this.getItems();
  }

  openItemDialog(itemData): void {
    this.dialog.open(ItemDialogComponent, {
      data: itemData,
    });
  }

  public getItems(): void {
    this.groupId = this.router.url.slice(12, this.router.url.length);
    this.itemService.getItems(this.groupId).subscribe(
      (response: Item[]) => {
        this.items = response;
        this.itemsLength = this.items.length;
        this.pageSlice = this.items.slice(0, this.pageSize);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onPageChange(event: PageEvent){
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if(endIndex > this.items.length){
      endIndex = this.items.length;
    }

    this.pageSlice = this.items.slice(startIndex, endIndex);
  }
}
