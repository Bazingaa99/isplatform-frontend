import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FeedbackCreationDialogComponent } from '../feedback-creation-dialog/feedback-creation-dialog.component';
import { UserService } from '../services/user.service';
import { User } from '../shared/user';

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  username: string;

  constructor(public dialog: MatDialog,
              public snackBar: MatSnackBar,
              public router: Router,
              private userService: UserService) { 
                this.router.routeReuseStrategy.shouldReuseRoute = function() {
                  return false;
              };
              }

  ngOnInit(): void {
    this.getUsername();
  }

  getUsername(): void {
    this.userService.getUserById(Number(this.router.url.slice(9, this.router.url.length))).subscribe(
      (response: User) => {
        this.username = response.username;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  openFeedbackDialog(): void {
    this.dialog.open(FeedbackCreationDialogComponent);
  }

  checkIfUserIsProfileOwner(): any {
    return (this.router.url.slice(9, this.router.url.length) === localStorage.getItem('userId'));
  }
}
