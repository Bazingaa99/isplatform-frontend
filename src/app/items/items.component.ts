import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../services/item.service';
import { Item } from '../shared/item';
import { Request } from '../shared/request';
import { PageEvent } from '@angular/material/paginator';
import { UpdateUsersGroupsService } from '../services/update-users-group.service';
import { Subscription } from 'rxjs';
import { ItemDialogComponent } from '../item-dialog/item-dialog.component';
import { RequestService } from '../services/request.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SafeUrl } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';

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
  public currentUserEmail: string;
  public request: Request;
  public imageUrl:SafeUrl
  name: String
  constructor(public dialog: MatDialog,
              private itemService: ItemService,
              private router: Router,
              private updateService: UpdateUsersGroupsService,
              private requestService: RequestService,
              private snackBar: MatSnackBar,
              private sanitizer:DomSanitizer) {
                this.updateEventSubscription = this.updateService.getUpdate().subscribe(()=>{
                  this.getItems();
                });
              }

  ngOnInit(): void {
    this.pageSize = 12;
    this.itemsLength = 0;
    this.getItems();
    this.currentUserEmail = localStorage.getItem('email');
  }
  test(itemData): any {
    if(!itemData.isHidden) {
      return true;
    } else if (this.checkIfOwner(itemData)) {
      return true;
    } else {
      return false;
    }
  }

  checkIfOwner(itemData): any {
    return (itemData.owner['email'] === localStorage.getItem('email'))
  }

  openItemDialog(itemData): void {
    
    this.requestService.getRequest(itemData.id, this.currentUserEmail).subscribe(
      (response: Request) => {
        if(response){
          this.dialog.open(ItemDialogComponent, {
            data: [itemData, true, response.responded, response.accepted]
          });
        }else{
          this.dialog.open(ItemDialogComponent, {
            data: [itemData, false]
          });
        }

      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }

  public getItems(): void {
    this.groupId = this.router.url.slice(12, this.router.url.length);
    this.itemService.getItems(this.groupId).subscribe(
      (response: Item[]) => {
        this.items = response;
        this.itemsLength = this.items.length;
        this.pageSlice = this.items.slice(0, this.pageSize);
        console.log(this.currentUserEmail, this.items);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public checkIfImageIsSet (item: Item):boolean{    
    return item.imageName===null   
  }
  public onPageChange(event: PageEvent){
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if(endIndex > this.items.length){
      endIndex = this.items.length;
    }
    this.pageSlice = this.items.slice(startIndex, endIndex);
  }
  // public getImage (item :Item):SafeUrl{
  //   this.itemService.getAttachment(item.id, item.image_name).subscribe(
  //     data => {
  //       var unsafeImageUrl = URL.createObjectURL(data);
  //       this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
  //   }, error => {
  //       console.log(error);
  //   }
  //   )
  //   return this.imageUrl
  // }
  
}
