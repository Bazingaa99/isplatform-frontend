import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeedbackService } from '../services/feedback.service';
import { UpdateUsersGroupsService } from '../services/update-users-group.service';

@Component({
  selector: 'feedback-delete-dialog',
  templateUrl: './feedback-delete-dialog.component.html',
  styleUrls: ['./feedback-delete-dialog.component.scss']
})
export class FeedbackDeleteDialogComponent implements OnInit {
  dialog: any;

  constructor(private feedbackService: FeedbackService,
              private updateService: UpdateUsersGroupsService,
              private snackBar: MatSnackBar,
              public feedbackDeleteDialog: MatDialogRef<FeedbackDeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public feedbackId: number) { }

  ngOnInit(): void {
  }

  deleteFeedback(feedbackId: number): void {
    this.feedbackDeleteDialog.close();
    this.feedbackService.deleteFeedback(feedbackId, localStorage.getItem('email')).subscribe(
      () => {
        this.updateService.sendUpdate();
        this.snackBar.open("Feedback successfuly deleted","✓",{
          duration: 400000000000000,
          panelClass: ['green-snackbar']
        })
      },
      (httpErrorResponse: HttpErrorResponse) => {
        let errorString = ""
        let errors = httpErrorResponse.error.errors;
        if(errors.length > 0){
        for(let i = 0; i < errors.length; i++){
            errorString += errors[i].defaultMessage + "\n"
          }
          this.snackBar.open(errorString,"✓",{
            duration: 400000000000000,
            panelClass: ['red-snackbar']
          })
        }else{
          this.snackBar.open("Couldn't delete Feedback. Please try again.","✓",{
            duration: 400000000000000,
            panelClass: ['red-snackbar']
          })
        }
      }
    )
  }
}
