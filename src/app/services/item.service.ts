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
    public name;
    constructor(private http: HttpClient,
      private updateService: UpdateUsersGroupsService) { }

    public getItems(id: string): Observable<Item[]>{
        return this.http.get<Item[]>( `${this.apiServerUrl}/isp/items/find/group/${id}`)
    }

    public getUserItems(email: string): Observable<Item[]>{
        return this.http.get<Item[]>( `${this.apiServerUrl}/isp/items/find/user/items/${email}`)
    }

    public addItem(item: Item, email: string): Observable<Item>{
      let data = {item, email}
      data.item = item;
      data.email = email;
      return this.http.post<Item>(`${this.apiServerUrl}/isp/items/add/`, data);
    }

    public addAttachment( itemId, file ): Observable<any> {
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      return this.http.post( `${this.apiServerUrl}/isp/items/${itemId}/image` ,
        formData, { headers });
    }
    public getAttachment( itemId, file ): Observable<Blob> {
      return this.http
        .get(`${this.apiServerUrl}/isp/items/${itemId}/image/${file}`,
          { responseType: 'blob' });
    }

    public updateItem(item: Item, email: string): Observable<Item>{
      let data = {item, email}
      data.item = item;
      data.email = email;
      return this.http.put<Item>(`${this.apiServerUrl}/isp/items/update/`, data);
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

    public bookmarkItem(itemId: number, email: string): Observable<object>{
      let data = {itemId, email}
      data.itemId = itemId
      data.email = email
      return this.http.post<object>(`${this.apiServerUrl}/isp/items/bookmark`, data)
    }

    public getItemsBookmarkedByUser(email: string): Observable<Item[]>{
      return this.http.get<Item[]>(`${this.apiServerUrl}/isp/items/find/bookmarks/user/${email}`)
    }

    public deleteBookmark(itemId: number, email: string): Observable<object>{
      return this.http.delete(`${this.apiServerUrl}/isp/items/delete/bookmark/${email}/${itemId}`)
    }

    public isBookmarkedByCurrentUser(itemId: number, email: string){
      return this.http.get(`${this.apiServerUrl}/isp/items/check/bookmark/${email}/${itemId}`)
    }
}
