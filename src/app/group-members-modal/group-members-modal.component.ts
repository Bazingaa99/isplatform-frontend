import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from '../shared/user';

@Component({
  selector: 'app-group-members-modal',
  templateUrl: './group-members-modal.component.html',
  styleUrls: ['./group-members-modal.component.scss']
})
export class GroupMembersModalComponent implements OnInit {
  users: User[]
  currentUser: string;
  constructor(public router: Router,
              public dialog: MatDialogRef<GroupMembersModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User[]) {
    this.users = data;
  }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('email');
  }

  goToUserProfile(link: string){
    this.dialog.close(GroupMembersModalComponent);
    this.router.navigateByUrl(link);
  }
}
