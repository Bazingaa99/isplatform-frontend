import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GroupCreationDialogComponent } from '../group-creation-dialog/group-creation-dialog.component';
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
  selectedUsersGroup: UsersGroup;
  updateEventSubscription:Subscription;

  constructor(private usersGroupService: UsersGroupService, 
              public dialog: MatDialog, 
              private router: Router,
              private updateUsersGroupsService: UpdateUsersGroupsService){
                this.updateEventSubscription = this.updateUsersGroupsService.getUpdate().subscribe(()=>{
                  this.getUsersGroups();
                });
              }

  ngOnInit() {
    this.getUsersGroups();
  }

  public getUsersGroups(): void {
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
    // this.router.navigateByUrl(['/usersgroup', usersGroup.id], );
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/usersgroup', usersGroup.id]);
    });

    this.selectedUsersGroup=usersGroup;
  }

  openDialog(): void {
    this.dialog.open(GroupCreationDialogComponent);
  }
}
