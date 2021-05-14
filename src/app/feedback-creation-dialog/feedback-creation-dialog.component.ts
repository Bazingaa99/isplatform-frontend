import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback } from '../shared/feedback';
import { FeedbackService } from '../services/feedback.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateUsersGroupsService } from '../services/update-users-group.service';

@Component({
  selector: 'feedback-creation-dialog',
  templateUrl: './feedback-creation-dialog.component.html',
  styleUrls: ['./feedback-creation-dialog.component.scss']
})
export class FeedbackCreationDialogComponent implements OnInit {
  feedbackCreationForm: FormGroup;
  userRated = true;
  feedback: Feedback;

  constructor(public dialog: MatDialogRef<FeedbackCreationDialogComponent>,
              private fb: FormBuilder,
              private feedbackService: FeedbackService,
              private router: Router,
              private snackBar: MatSnackBar,
              private updateService: UpdateUsersGroupsService) {
    this.feedbackCreationForm = this.setForm();
   }

  ngOnInit(): void {
  }

  setForm() {
    return this.fb.group({
      feedbackText: ['', [
        Validators.maxLength(100),
      ]],
    });
  }

  onCreateFeedback(): void{
    var stars = document.getElementsByTagName('input');
    let starsCount;
    for (var i=0; i<stars.length; i++) {
      if(stars[i].type == 'radio' && stars[i].checked){
        this.userRated = true;
        starsCount = 5-i;
        break;
      }
      if (i==(stars.length-1) && stars[i].type == 'radio' && !stars[i].checked) {
        this.userRated = false;
      }
    }
    if(this.userRated){
      this.closeDialog();
      console.log(this.feedbackCreationForm.get('feedbackText').value);
      let receiverId = Number(this.router.url.slice(9, this.router.url.length));
      this.feedback = {
        feedbackMessage: this.feedbackCreationForm.get('feedbackText').value,
        starsCount: starsCount,
      }
      console.log(this.feedback);
      this.feedbackService.createFeedback(this.feedback, localStorage.getItem('email'), receiverId).subscribe(
        (response: Feedback) => {
          this.updateService.sendUpdate();
          this.snackBar.open("You successfuly left a feedback","✓",{
            duration: 400000000000000,
            panelClass: ['green-snackbar']
          })
        },
        (error: HttpErrorResponse) => {
          this.snackBar.open("Couldn't leave a feedback. Please try again.","✓",{
            duration: 400000000000000,
            panelClass: ['red-snackbar']
          })
        }
      );
    }
  }

  closeDialog(): void {
    this.dialog.close(FeedbackCreationDialogComponent);
  }
}