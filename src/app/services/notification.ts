import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserNotification } from '../shared/user-notification';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public getUserNotifications(userId: Number): Observable<UserNotification[]>{
      return this.http.get<UserNotification[]>( `${this.apiServerUrl}/notifications/${userId}`)
    }
    
    public getUserNotificationsCount(userId: Number): Observable<number>{
        return this.http.get<number>( `${this.apiServerUrl}/notifications/count/${userId}`)
    }

    public createUserNotification(userNotificationMessage: String, writerId: Number, receiverId: Number): void{
        let data = {userNotificationMessage, writerId, receiverId}
        data.userNotificationMessage = userNotificationMessage;
        data.writerId = writerId;
        data.receiverId = receiverId;
        this.http.post( `${this.apiServerUrl}/notifications/create/`, data)
    }

    public setNotificationsSeen(notificationId: Number): any{
        return this.http.put( `${this.apiServerUrl}/notifications/set/seen/`, notificationId)
    }
}
