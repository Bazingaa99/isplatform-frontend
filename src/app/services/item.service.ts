import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Request } from '../shared/request';
import { Item } from '../shared/item';
import { UpdateUsersGroupsService } from './update-users-group.service';

@Injectable({
    providedIn: 'root'
})
export class ItemService {
    private apiServerUrl = environment.apiBaseUrl;
    public groupId;
    constructor(private http: HttpClient,
      private updateService: UpdateUsersGroupsService) { }

    public getItems(id: string): Observable<Item[]>{
        return this.http.get<Item[]>( `${this.apiServerUrl}/isp/items/find/group/${id}`)
    }

    public addItem(item: Item, email: string): Observable<Item>{
      let data = {item, email}
      data.item = item;
      data.email = email;
      return this.http.post<Item>(`${this.apiServerUrl}/isp/items/add/`, data);
    }

    public updateItem(item: Item, email: string): Observable<void>{
      let data = {item, email}
      data.item = item;
      data.email = email;
      return this.http.put<void>(`${this.apiServerUrl}/isp/items/update/`, data);
    }
    
    public deleteItem(itemId: number, email: string): Observable<object>{
      return this.http.delete(`${this.apiServerUrl}/isp/items/delete/${itemId}&${email}`);
    }

    public requestItem(request: Request, email: string): Observable<Request>{
      let data = {request, email}
      data.request = request;
      data.email = email;
      return this.http.post<Request>(`${this.apiServerUrl}/isp/request/add/`, data);
    }
}
