import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeedbackCreationDialogComponent } from '../feedback-creation-dialog/feedback-creation-dialog.component';

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  username: string;

  constructor(public dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
  }

  openFeedbackDialog(): void {
    this.dialog.open(FeedbackCreationDialogComponent);
  }
}
