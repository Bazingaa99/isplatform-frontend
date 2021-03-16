import { Component, OnInit} from '@angular/core';
import { GroupsService } from '../groups.service';
import { MatDialog } from '@angular/material/dialog'; 
import { GroupCreationDialogComponent } from '../group-creation-dialog/group-creation-dialog.component'; 
import { UsersGroup } from '../users-group';
import { UsersGroupService } from '../users-group.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss',]
})
export class GroupsComponent implements OnInit{

  public usersGroup: UsersGroup[];

  constructor(private usersGroupService: UsersGroupService, public dialog: MatDialog){}

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

  /*
  public groups = [];

  constructor(private _groupsService: GroupsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.groups = this._groupsService.getGroups();
  }
  */
  openDialog(): void { 
    this.dialog.open(GroupCreationDialogComponent); 
  }
}
