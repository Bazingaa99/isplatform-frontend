import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { GroupCreationDialogComponent } from '../group-creation-dialog/group-creation-dialog.component'; 
import { UsersGroup } from '../users-group';
import { UsersGroupService } from '../users-group.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss',]
})
export class GroupsComponent implements OnInit{

  public usersGroup: UsersGroup[];
  selectedUsersGroup: UsersGroup;

  constructor(private usersGroupService: UsersGroupService, public dialog: MatDialog, private router: Router){}

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
    this.router.navigate(['/usersgroup', usersGroup.id]);
    this.selectedUsersGroup=usersGroup;
  }

  openDialog(): void { 
    this.dialog.open(GroupCreationDialogComponent); 
  }
}
