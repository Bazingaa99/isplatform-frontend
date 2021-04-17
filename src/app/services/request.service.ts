import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Request } from '../shared/request';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RequestService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public getRequestsByOwnerEmail(email: string, accepted: boolean): Observable<Request[]>{
        console.log(`${this.apiServerUrl}/isp/request/for/${email}`)
        return this.http.get<Request[]>( `${this.apiServerUrl}/isp/request/for/${email}`)
    }

    public getRequestsByRequesterEmail(email: string, accepted: boolean): Observable<Request[]>{
      console.log(`${this.apiServerUrl}/isp/request/by/${email}&${accepted}`)
      return this.http.get<Request[]>( `${this.apiServerUrl}/isp/request/by/${email}&${accepted}`)
  }
}
