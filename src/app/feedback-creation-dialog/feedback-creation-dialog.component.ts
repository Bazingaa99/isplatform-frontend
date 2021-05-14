import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback } from '../shared/feedback';

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
              private fb: FormBuilder) {
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
        console.log("ivyko");
        starsCount = 6-i;
        break;
      }
      if (i==(stars.length-1) && stars[i].type == 'radio' && !stars[i].checked) {
        this.userRated = false;
      }
    }
    if(this.userRated){
      this.closeDialog();
      this.feedback = {
       feedbackMessage: this.feedbackCreationForm.get('feedbackText').value,
       starsCount: starsCount,
      }
    }
  }

  closeDialog(): void {
    this.dialog.close(FeedbackCreationDialogComponent);
  }
}