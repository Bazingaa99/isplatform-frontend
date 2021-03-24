import {Injectable} from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import {AuthServiceService} from './auth-service.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';




@Injectable()
export class RoleGuardService implements CanActivate {
  public jwtHelper: JwtHelperService = new JwtHelperService();
  public auth: AuthServiceService = new AuthServiceService();

  constructor(public router: Router) {
  }

  setRole(token: string) {
    const tokenPayload = this.jwtHelper.decodeToken(token);
    if (tokenPayload) {
      localStorage.setItem('roles', JSON.stringify(tokenPayload.roles));
    } else {
      localStorage.setItem('roles', '');
    }
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    const role: string = localStorage.getItem('roles'); 
    if (
      role.includes(expectedRole) && this.auth.isAuthenticated()
    ) {
      return true;
    }
    this.router.navigate(['']).catch();
    return false;
  }
}