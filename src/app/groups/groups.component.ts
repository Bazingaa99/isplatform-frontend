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
export class GroupsComponent implements OnInit{

  public usersGroup: UsersGroup[];
  updateEventSubscription:Subscription;
  public selectedId: number;

  constructor(private usersGroupService: UsersGroupService,
              private router: Router,
              private updateUsersGroupsService: UpdateUsersGroupsService){
                this.updateEventSubscription = this.updateUsersGroupsService.getUpdate().subscribe(()=>{
                  this.getUsersGroups();
                });
              }

  ngOnInit() {
    this.getUsersGroups();
    this.selectedId = Number(this.router.url.slice(12, this.router.url.length))
  }

  getUsersGroups(): void {
    this.usersGroupService.getUsersGroups().subscribe(
      (response: UsersGroup[]) => {
        this.usersGroup = response;
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
