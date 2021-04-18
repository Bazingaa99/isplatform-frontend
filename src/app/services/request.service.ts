import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Request } from '../shared/request';
import { environment } from 'src/environments/environment';
import { Item } from '../shared/item';

@Injectable({
    providedIn: 'root'
})
export class RequestService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public getRequestsByOwnerEmail(email: string, accepted: boolean): Observable<Request[]>{
        return this.http.get<Request[]>( `${this.apiServerUrl}/isp/request/for/${email}&${accepted}`)
    }

    public getRequestsByRequesterEmail(email: string, accepted: boolean): Observable<Request[]>{
      return this.http.get<Request[]>( `${this.apiServerUrl}/isp/request/by/${email}&${accepted}`)
  }

  checkIfRequested(itemId: number, email: string): Observable<boolean>{
    return this.http.get<boolean>(`${this.apiServerUrl}/isp/request/exists/${itemId}&${email}`);
  }

  deleteRequest(requestId: number): void {
    this.http.delete(`${this.apiServerUrl}/isp/request/delete/${requestId}`).subscribe(
      data => {
        console.log(data);
      }
    )
  }
}
