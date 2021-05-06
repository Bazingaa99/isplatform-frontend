import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Request } from '../shared/request';
import { environment } from 'src/environments/environment';
import { Item } from '../shared/item';
import { ResponseToRequest } from '../shared/response-to-request';

@Injectable({
    providedIn: 'root'
})
export class RequestService {



    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public getRequestsByOwnerEmail(email: string, responded: boolean, accepted?: boolean, returned?: boolean): Observable<Request[]>{
      if(accepted===undefined){
        return this.http.get<Request[]>( `${this.apiServerUrl}/isp/request/notRespondedByOwner/${email}${returned}`)
      }
      else{
        return this.http.get<Request[]>( `${this.apiServerUrl}/isp/request/for/${email}&${accepted}&${responded}&${returned}`)
      }
    }

    public getRequestsByRequesterEmail(email: string, accepted?: boolean, returned?: boolean): Observable<Request[]>{
      if(accepted===undefined){
        return this.http.get<Request[]>( `${this.apiServerUrl}/isp/request/notRespondedByRequester/${email}&${returned}`)
      }else{
        return this.http.get<Request[]>( `${this.apiServerUrl}/isp/request/by/${email}&${accepted}&${returned}`)
      }
  }

  getRequest(itemId: number, email: string): Observable<Request>{
    return this.http.get<Request>(`${this.apiServerUrl}/isp/request/exists/${itemId}&${email}`);
  }

  deleteRequest(requestId: number): Observable<object> {
    return this.http.delete(`${this.apiServerUrl}/isp/request/delete/${requestId}`);
  }

  responseToRequest(requestId: number, isAccepted: boolean){

    let data={isAccepted,requestId}
    data.isAccepted=isAccepted;
    data.requestId=requestId;
    return this.http.put(`${this.apiServerUrl}/isp/request/update-acceptance`, data);
  }

  itemReturned(requestId: number, email: string) {
    let data={email,requestId}
    data.email=email;
    data.requestId=requestId;
    return this.http.put(`${this.apiServerUrl}/isp/request/item-returned`, data);
  }

  relistItem(requestId:number, email: string){
    let data={email,requestId}
    data.email=email;
    data.requestId=requestId;
    
    return this.http.put(`${this.apiServerUrl}/isp/request/item-relist`, data);
  }

  checkIfItemReturned(item: Item) {
    return this.http.get(`${this.apiServerUrl}/isp/request/checkIfItemIsReturned/${item.id}`);
  }
}
