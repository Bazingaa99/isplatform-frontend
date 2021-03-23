import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Item } from '../shared/item';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ItemService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public getItems(id: string): Observable<Item[]>{
        return this.http.get<Item[]>( `${this.apiServerUrl}/isp/items/find/group/${id}`)
    }

    public addItem(item: Item): Observable<Item>{
      return this.http.post<Item>(this.apiServerUrl + '/isp/items/add/', item);
    }

    // public updateItem(item: Item): Observable<Item>{
    //   return this.http.put<Item>('${this.apiServerUrl}/isp/all/items', item);
    //}
}
