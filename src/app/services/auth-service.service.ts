import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";


@Injectable()
export class AuthServiceService {
  public jwtHelper: JwtHelperService = new JwtHelperService();

  constructor() {
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

}