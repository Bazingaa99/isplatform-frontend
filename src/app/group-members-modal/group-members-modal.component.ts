import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { User } from '../shared/user';

@Component({
  selector: 'app-group-members-modal',
  templateUrl: './group-members-modal.component.html',
  styleUrls: ['./group-members-modal.component.scss']
})
export class GroupMembersModalComponent implements OnInit {
  users: User[]
  usersLength: number;
  currentUser: string;
  pageSlice: User[];
  constructor(public router: Router,
              public dialog: MatDialogRef<GroupMembersModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User[]) {
    this.users = data;
    this.usersLength = this.users.length;
    this.pageSlice = this.users.slice(0, 6);
  }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('email');
  }

  goToUserProfile(link: string){
    this.dialog.close(GroupMembersModalComponent);
    this.router.navigateByUrl(link);
  }

  public onPageChange(event: PageEvent){
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if(endIndex > this.users.length){
      endIndex = this.users.length;
    }

    this.pageSlice = this.users.slice(startIndex, endIndex);
  }
}
