import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
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
import { Category } from '../shared/category';
import { CategoryService } from '../services/category.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

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
  public categoryList: Category[];
  public categories = new FormControl();
  public duration: number;
  public globalStartIndex: number;
  public globalEndIndex: number;
  @ViewChild('categorySelect') categorySelect: MatSelect;
  allCategoriesSelected: boolean;
  constructor(public dialog: MatDialog,
              private itemService: ItemService,
              private router: Router,
              private updateService: UpdateUsersGroupsService,
              private usersGroupService: UsersGroupService,
              private requestService: RequestService,
              private userService: UserService,
              private categoryService: CategoryService,
              private snackBar: MatSnackBar,
              private sanitizer:DomSanitizer) {
                this.updateEventSubscription = this.updateService.getUpdate().subscribe(()=>{
                  this.currentPage = this.router.url.substring(1,8);
                  if(this.currentPage === "profile")
                  {
                    this.getUserItems();
                  } else {
                    if(this.router.url.slice(1, this.router.url.length) != "usersgroup"){
                      this.checkIfGroupOwner();
                      this.getItems();
                    }
                  }
                });
              }

  ngOnInit(): void {
    this.duration = 1;
    this.globalStartIndex = 0;
    this.globalEndIndex = this.pageSize;
    this.allCategoriesSelected = true;
    this.getCategories();
    this.currentPage = this.router.url.substring(1,8);
    this.loadPage = false;
    this.pageSize = 12;
    this.itemsLength = 0;
    this.currentUserEmail = localStorage.getItem('email');
    if(this.currentPage === "profile")
    { 
      this.getUserItems(); 
    } else {
      if(this.router.url.slice(1, this.router.url.length) != "usersgroup"){
        this.checkIfGroupOwner();
        this.getItems();
      }
    }
  }

  ngAfterViewInit(){
    setTimeout(() => {
        this.categorySelect.options.forEach( (item : MatOption) => item.select());
    }, 250);

  }

  test(itemData): any {
    if(!itemData.hidden || this.checkIfOwner(itemData)) {
      return true;
    } else {
      return false;
    }
  }

  filterItems(categoryFilter, durationFilter){
    console.log(categoryFilter, durationFilter);
    if(categoryFilter !== null && categoryFilter.length > 0){
      this.pageSlice = this.items.filter(item => categoryFilter.includes(item.category['categoryName']) && item.duration >= durationFilter).slice(this.globalStartIndex, this.globalEndIndex);
    }else if(categoryFilter !== null && categoryFilter.length === 0 || categoryFilter === null){
      this.pageSlice = [];
    }

    if(this.pageSlice.length === 0){
      this.itemsLength = 0;
    }else{
      this.itemsLength = this.items.length;
    }
  }

  selectAll(selectAll: boolean){
    if(selectAll){
      this.categorySelect.options.forEach( (item : MatOption) => item.select());
      this.allCategoriesSelected = true;
    }else{
      this.categorySelect.options.forEach( (item : MatOption) => item.deselect());
      this.allCategoriesSelected = false;
    }

    this.filterItems(this.categories.value, this.duration);

  }

  formatLabel(value: number) {
    return value;
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      (response: Category[]) => {
        this.categoryList = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  checkIfOwner(itemData): any {
    return (itemData.owner['email'] === localStorage.getItem('email'))
  }

  openItemDialog(itemData): void {

  this.itemService.itemViewed(itemData.id).subscribe(
    (response:Response)=>{
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
    },
    (error:HttpErrorResponse) => {
      alert(error)
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

    this.globalStartIndex = startIndex;
    this.globalEndIndex = endIndex;

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
