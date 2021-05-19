import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FeedbackCreationDialogComponent } from '../feedback-creation-dialog/feedback-creation-dialog.component';
import { UserService } from '../services/user.service';
import { User } from '../shared/user';
import { FeedbackService } from '../services/feedback.service';
import { UpdateUsersGroupsService } from '../services/update-users-group.service';

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  username: string;
  feedbacksCount: number;
  showItems = true;
  updateEventSubscription: any;

  constructor(public dialog: MatDialog,
              public snackBar: MatSnackBar,
              public router: Router,
              private userService: UserService,
              private feedbackService: FeedbackService,
              private updateService: UpdateUsersGroupsService) {
                this.updateEventSubscription = this.updateService.getUpdate().subscribe(()=>{
                  this.getFeedbacksCount();
                });
                this.router.routeReuseStrategy.shouldReuseRoute = function() {
                  return false;
              };
              }

  ngOnInit(): void {
    this.getUsername();
    this.getFeedbacksCount();
  }

  ngOnDestroy() {
      this.updateEventSubscription.unsubscribe();
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

  getFeedbacksCount(): void {
    this.feedbackService.getFeedbacksCount(Number(this.router.url.slice(9, this.router.url.length))).subscribe(
      (response: number) => {
        this.feedbacksCount = response;
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

  switchToFeedbacks(){
    this.showItems = false;
  }

  switchToItems(){
    this.showItems = true;
  }
}
