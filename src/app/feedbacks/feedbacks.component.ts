import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { UpdateUsersGroupsService } from '../services/update-users-group.service';
import { Subscription } from 'rxjs';
import { Feedback } from '../shared/feedback';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.scss'],
})

export class FeedbacksComponent implements OnInit {
  public feedbacks: Feedback[];
  public feedbacksLength: number;
  public pageSize: number;
  public pageSlice;
  updateEventSubscription:Subscription;

  constructor(public dialog: MatDialog,
              private feedbackService: FeedbackService,
              private router: Router,
              private updateService: UpdateUsersGroupsService) {
                this.updateEventSubscription = this.updateService.getUpdate().subscribe(()=>{
                  this.getUserFeedbacks(); 
                });
              }

  ngOnInit(): void {
    this.pageSize = 10;
    this.feedbacksLength = 0;
    this.getUserFeedbacks(); 
  }

  counter(i: number) {
      return new Array(i);
  }
  public getUserFeedbacks(): void {
    this.feedbackService.getUserFeedbacks(Number(this.router.url.substring(9, this.router.url.length))).subscribe(
      (response: Feedback[]) => {
        this.feedbacks = response;
        this.feedbacksLength = this.feedbacks.length;
        this.pageSlice = this.feedbacks.slice(0, this.pageSize);
        console.log(this.feedbacks);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onPageChange(event: PageEvent){
    console.log("click");
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if(endIndex > this.feedbacks.length){
      endIndex = this.feedbacks.length;
    }
    this.pageSlice = this.feedbacks.slice(startIndex, endIndex);
  }
}
