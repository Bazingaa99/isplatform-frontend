import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsersGroup } from '../shared/users-group';

@Injectable({providedIn: 'root'})
export class UsersGroupService {
    private apiServerUrl = environment.apiBaseUrl;
    public groupsLength: number;

    constructor(private http: HttpClient) { }

    public getAllGroups(): Observable<UsersGroup[]> {
        return this.http.get<UsersGroup[]>(`${this.apiServerUrl}/usersgroup/all`);
    }

    public createUsersGroups(usersGroup: UsersGroup, email: string): Observable<UsersGroup> {
        let data = {usersGroup, email}
        data.usersGroup = usersGroup;
        data.email = email;
        return this.http.post<UsersGroup>(`${this.apiServerUrl}/usersgroup/create`, data);
    }

    public updateUsersGroups(usersgroup: UsersGroup): Observable<UsersGroup> {
        return this.http.put<UsersGroup>(`${this.apiServerUrl}/usersgroup/update`, usersgroup);
    }

    public deleteUsersGroups(usersgroupId: number): Observable<UsersGroup> {
        return this.http.delete<UsersGroup>(`${this.apiServerUrl}/usersgroup/delete/${usersgroupId}`);
    }

    public getUserGroups(email: string): Observable<UsersGroup[]> {
        return this.http.get<UsersGroup[]>(`${this.apiServerUrl}/usersgroup/find/user/groups/${email}`);
    }
}
