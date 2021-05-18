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
import { UsersGroupService } from '../services/users-group.service';
import { GroupCreationDialogComponent } from '../group-creation-dialog/group-creation-dialog.component';
import { UserService } from '../services/user.service';
import { User } from '../shared/user';
import { GroupMembersModalComponent } from '../group-members-modal/group-members-modal.component';

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
  public loadPage: boolean;
  public userIsGroupOwner = false;
  currentPage: String;
  constructor(public dialog: MatDialog,
              private itemService: ItemService,
              private router: Router,
              private updateService: UpdateUsersGroupsService,
              private usersGroupService: UsersGroupService,
              private requestService: RequestService,
              private userService: UserService,
              private snackBar: MatSnackBar,
              private sanitizer:DomSanitizer) {
                this.updateEventSubscription = this.updateService.getUpdate().subscribe(()=>{
                  this.currentPage = this.router.url.substring(1,8);
                  if(this.currentPage === "profile")
                  {
                    this.getUserItems();
                  } else {
                    this.checkIfGroupOwner();
                    this.getItems();
                  }
                });
              }

  ngOnInit(): void {
    this.currentPage = this.router.url.substring(1,8);
    this.loadPage = false;
    this.pageSize = 12;
    this.itemsLength = 0;
    this.currentUserEmail = localStorage.getItem('email');
    if(this.currentPage === "profile")
    {
      console.log("profile");
      this.getUserItems();
    } else {
      console.log("notprofile");
      this.checkIfGroupOwner();
      this.getItems();
    }
  }

  test(itemData): any {
    if(!itemData.hidden || this.checkIfOwner(itemData)) {
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

  openGroupUpdateDialog(): void {
    this.dialog.open(GroupCreationDialogComponent, {
      data: this.groupId,
    });
  }

  public checkIfGroupOwner(): any {
    this.groupId = this.router.url.slice(12, this.router.url.length);
    this.usersGroupService.checkIfGroupOwner(this.groupId, this.currentUserEmail).subscribe(
      (response: boolean) => {
        this.userIsGroupOwner = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getItems(): void {
    this.groupId = this.router.url.slice(12, this.router.url.length);
    this.itemService.getItems(this.groupId).subscribe(
      (response: Item[]) => {
        this.items = response;
        console.log(this.items)
        this.itemsLength = this.items.length;
        this.loadPage = true;
        this.pageSlice = this.items.slice(0, this.pageSize);
        console.log(this.currentUserEmail, this.items);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getUserItems(): void {
    this.itemService.getUserItems(this.currentUserEmail, this.router.url.substring(9, this.router.url.length)).subscribe(
      (response: Item[]) => {
        this.items = response;
        this.itemsLength = this.items.length;
        this.loadPage = true;
        this.pageSlice = this.items.slice(0, this.pageSize);
        console.log(this.items);
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

  public showGroupMembers(){
    this.userService.getUsersByGroupId(this.groupId).subscribe(
      (response: User[]) => {
        this.dialog.open(GroupMembersModalComponent, {
          data: response
        })
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.snackBar.open("Could not get group members. Please try again.","✓",{
          duration: 400000000000000,
          panelClass: ['orange-snackbar']
        })
      }
    )
  }
}
