import {Injectable} from '@angular/core';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private router: Router) {
  }

  onLogOut() {
    window.addEventListener('storage', (event) => {
        if (event.storageArea == localStorage) {
          const token = localStorage.getItem('token');
          if (!isNotNullOrUndefined(token)) {
            // Perform logout
            //Navigate to home
            this.router.navigate(['']);
          }
        }
      }
    );
  }

  onTokenExpired() {
    setInterval(() => {
      const token = localStorage.getItem('token');
      if (isNotNullOrUndefined(token)) {
        if (this.jwtHelper.isTokenExpired(token)) {
          localStorage.removeItem('token');
          localStorage.removeItem('email');
          localStorage.removeItem('roles');
          this.router.navigate(['']);
        }
      }
    }, 60 * 100);
  }
}