import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UpdateUsersGroupsService {
    private Subject = new Subject<any>();

    sendUpdate(){
        this.Subject.next();
    }

    getUpdate():Observable<any>{
        return this.Subject.asObservable();
    }
}