import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  updateEventSubscription:Subscription;

  constructor(private notificationService: NotificationService,
              private updateService: UpdateUsersGroupsService) {
                this.updateEventSubscription = this.updateService.getUpdate().subscribe(()=>{
                  this.getUserNotifications();
                });
  }

  ngOnInit(): void {
    this.pageSize = 12;
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
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
