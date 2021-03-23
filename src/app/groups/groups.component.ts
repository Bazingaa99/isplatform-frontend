import { Component, OnInit} from '@angular/core';
import { UsersGroup } from '../shared/users-group';
import { UsersGroupService } from '../services/users-group.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UpdateUsersGroupsService } from '../services/update-users-group.service'; 
import { Subscription } from 'rxjs';
import { User } from '../shared/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss',]
})
export class GroupsComponent{

  public userId: number;
  public usersGroup: UsersGroup[];
  updateEventSubscription:Subscription;

  constructor(private usersGroupService: UsersGroupService,
              private router: Router,
              private userService: UserService,
              private updateUsersGroupsService: UpdateUsersGroupsService){/*
                this.updateEventSubscription = this.updateUsersGroupsService.getUpdate().subscribe(()=>{
                  this.getUserId();
                  this.getUserGroups(this.userId);
                });
                */
              }

  ngOnInit(): void{
    this.getUserId();
    //this.getUserGroups();
    console.log("2" + this.userId);
  }

  public getUserId(): void {
    this.userService.getUserByEmail(localStorage.getItem('email')).subscribe(
      (response: User) => {
        this.userId = response.id;
        this.getUserGroups(this.userId);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  getUserGroups(id): void {
    this.usersGroupService.getUserGroups(id.toString()).subscribe(
      (response: UsersGroup[]) => {
        this.usersGroup = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onSelect(usersGroup){
    // this.router.navigateByUrl(['/usersgroup', usersGroup.id], );
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
     this.router.navigate(['/usersgroup', usersGroup.id]);
    });
  }
}
