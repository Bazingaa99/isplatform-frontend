import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { NotificationService } from '../services/notification';
import { UpdateUsersGroupsService } from '../services/update-users-group.service';
import { UserNotification } from '../shared/user-notification';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  public notifications: UserNotification[];
  public notificationsLength: number;
  public pageSize: number;
  public pageSlice;

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.pageSize = 9;
    this.notificationsLength = 0;
    this.getUserNotifications();
  }
  
  public getUserNotifications(): void {
    this.notifications = [];
    this.notificationService.getUserNotifications(Number(localStorage.getItem('userId'))).subscribe(
      (response: UserNotification[]) => {
        this.notifications = response;
        this.notificationsLength = this.notifications.length;
        this.pageSlice = this.notifications.slice(0, this.pageSize);
        this.notifications.forEach(notification => {
          if(!notification.seen) {
            this.notificationService.setNotificationsSeen(notification.id).subscribe(()=>{});
          }
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
  public onPageChange(event: PageEvent){
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if(endIndex > this.notifications.length){
      endIndex = this.notifications.length;
    }
    this.pageSlice = this.notifications.slice(startIndex, endIndex);
  }
}
