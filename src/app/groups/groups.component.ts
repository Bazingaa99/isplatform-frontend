import { Component, OnInit} from '@angular/core';
import { UsersGroup } from '../shared/users-group';
import { UsersGroupService } from '../services/users-group.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UpdateUsersGroupsService } from '../services/update-users-group.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss',]
})
export class GroupsComponent{

  public userId: number;
  public usersGroup: UsersGroup[];
  updateEventSubscription:Subscription;
  public selectedId: number;
  showArrows: boolean;

  constructor(private usersGroupService: UsersGroupService,
              private router: Router,
              private updateUsersGroupsService: UpdateUsersGroupsService){
                this.updateEventSubscription = this.updateUsersGroupsService.getUpdate().subscribe(()=>{
                  this.getUserGroups();
                });
              }

  ngOnInit(): void{
    this.selectedId = Number(this.router.url.slice(12, this.router.url.length))
    this.getUserGroups();
  }

  getUserGroups(): void {
    this.usersGroupService.getUserGroups(localStorage.getItem('email')).subscribe(
      (response: UsersGroup[]) => {
        this.usersGroup = response;
        this.usersGroupService.groupsLength = response.length;
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
}
