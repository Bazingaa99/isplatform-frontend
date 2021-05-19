import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GroupCreationDialogComponent } from '../group-creation-dialog/group-creation-dialog.component';
import { ItemCreationDialogComponent } from '../item-creation-dialog/item-creation-dialog.component';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { UsersGroupService } from '../services/users-group.service';
import { UpdateUsersGroupsService } from '../services/update-users-group.service';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  showOutlet: boolean;
  groupId: string;

  constructor(public dialog: MatDialog,
              public router: Router,
              public snackBar: MatSnackBar,
              public userGroupService: UsersGroupService) { }

  ngOnInit(): void {
    this.groupId =  this.router.url.slice(12, this.router.url.length);
  }

  openItemDialog(): void {
    if(this.groupId === ""){
      this.snackBar.open("Please select a group before adding an item","✓",{
        duration: 400000000000000,
        panelClass: ['orange-snackbar']
      })

      return;
    }
    this.dialog.open(ItemCreationDialogComponent);
  }

  openGroupDialog(): void {
    this.dialog.open(GroupCreationDialogComponent);
  }
}
