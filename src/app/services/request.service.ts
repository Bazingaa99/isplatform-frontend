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

    public getRequestsByOwnerEmail(email: string, responded: boolean, accepted?: boolean): Observable<Request[]>{
      if(accepted===undefined){
        return this.http.get<Request[]>( `${this.apiServerUrl}/isp/request/notRespondedByOwner/${email}`)
      }
      else{
        return this.http.get<Request[]>( `${this.apiServerUrl}/isp/request/for/${email}&${accepted}&${responded}`)
      }
    }

    public getRequestsByRequesterEmail(email: string, accepted?: boolean): Observable<Request[]>{
      if(accepted===undefined){
        return this.http.get<Request[]>( `${this.apiServerUrl}/isp/request/notRespondedByRequester/${email}`)
      }else{
        return this.http.get<Request[]>( `${this.apiServerUrl}/isp/request/by/${email}&${accepted}`)
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
}
