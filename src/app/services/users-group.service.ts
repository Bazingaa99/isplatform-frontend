import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddToGroupResponse } from '../shared/add-to-group-response';
import { AddToGroupToken } from '../shared/add-to-group-token';
import { UsersGroup } from '../shared/users-group';

@Injectable({providedIn: 'root'})
export class UsersGroupService {
    private apiServerUrl = environment.apiBaseUrl;

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
    public getAddToGroupToken(usersgroupId: string, email:string){
        const token =this.http.get<AddToGroupToken>(environment.apiBaseUrl + '/usersgroup/generate-token/'+usersgroupId +"&"+email)
        return token
    }

    addToGroup(token: string, email:string){
        let data={email,token}
        data.token=token
        data.email=email
        const link =this.http.post<AddToGroupResponse>(environment.apiBaseUrl + '/usersgroup/add-to-group/',data )
        return link
      }
}
