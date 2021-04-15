import { Component, OnInit} from '@angular/core';
import { UsersGroup } from '../shared/users-group';
import { UsersGroupService } from '../services/users-group.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UpdateUsersGroupsService } from '../services/update-users-group.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AddToGroupToken } from '../shared/add-to-group-token';

@Component({
  selector: 'groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss',]
})
export class GroupsComponent{
  public groupId: string;
  public userId: number;
  public usersGroup: UsersGroup[];
  updateEventSubscription:Subscription;
  public usersGroupsPageSize: number;
  public usersGroupsPageSlice;
  public usersGroupsLength: number;
  selectedId: number;

  constructor(private usersGroupService: UsersGroupService,
              private router: Router,
              private updateUsersGroupsService: UpdateUsersGroupsService){
                this.updateEventSubscription = this.updateUsersGroupsService.getUpdate().subscribe(()=>{
                  this.getUserGroups();
                });
              }

  ngOnInit(): void{
    this.usersGroupsPageSize = 7;
    this.getUserGroups();
    this.selectedId = Number(this.router.url.slice(12, this.router.url.length))

  }
  

  getUserGroups(): void {
    this.usersGroupService.getUserGroups(localStorage.getItem('email')).subscribe(
      (response: UsersGroup[]) => {
        this.usersGroup = response;
        this.usersGroupsLength = response.length;
        this.usersGroupsPageSlice = this.usersGroup.slice(0, this.usersGroupsPageSize);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onSelect(usersGroup){
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
     this.router.navigate(['/usersgroup', usersGroup.id]);
    });
  }

  onGroupsPageChange(event: PageEvent){
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if(endIndex > this.usersGroup.length){
      endIndex = this.usersGroup.length;
    }

    this.usersGroupsPageSlice = this.usersGroup.slice(startIndex, endIndex);
  }
}
