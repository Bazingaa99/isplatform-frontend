import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'feedback-creation-dialog',
  templateUrl: './feedback-creation-dialog.component.html',
  styleUrls: ['./feedback-creation-dialog.component.scss']
})
export class FeedbackCreationDialogComponent implements OnInit {

  constructor(public dialog: MatDialogRef<FeedbackCreationDialogComponent>) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialog.close(FeedbackCreationDialogComponent);
  }
}
