import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Registration} from '../shared/registration';
import {LoginInfo} from '../shared/login';
import { environment } from 'src/environments/environment';
import { Token } from '../shared/confirm-email-token';
import { ConfirmEmailResponse } from '../shared/confirm-email-response';
import { User } from '../shared/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {


  private apiServerUrl = environment.apiBaseUrl

  constructor(private httpClient: HttpClient) {
  }

  confirmEmail(token: string){
    const link =this.httpClient.get<ConfirmEmailResponse>(environment.apiBaseUrl + '/auth/registration/confirm?token='+token )
    return link
  }
  submitRegistration(info: Registration): Observable<Registration> {
    console.log(info)
    return this.httpClient
      .post<Registration>((environment.apiBaseUrl + `/auth/registration`), info.user);
  }

  submitLogin(loginInfo: LoginInfo): Observable<LoginInfo> {
    return this.httpClient
      .post <LoginInfo>((environment.apiBaseUrl + `/auth/login`), loginInfo);
  }

  getUserByEmail(email: String): Observable<User>{
    return this.httpClient.get<User>( `${this.apiServerUrl}/isp/user/${email}`)
  }

  updateUser(user:User){
    
    return this.httpClient.put<User>((`${this.apiServerUrl}/isp/user/update`),user)
  }

  private errorHandlerForTxt(error: HttpErrorResponse) {
    return throwError(error.status);
  }
  private errorHandler(error: HttpErrorResponse) {
    return throwError(error.error.message);
  }

  onSubmitPasswordChange(email,oldPassword,newPassword) {

    let data={email,oldPassword,newPassword}
    data.email=email;
    data.newPassword=newPassword;
    data.oldPassword=oldPassword;
    return this.httpClient.put<User>((`${this.apiServerUrl}/isp/user/updatePassword`),data)
  }
}
