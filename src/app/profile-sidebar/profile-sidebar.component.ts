import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'profile-sidebar',
  templateUrl: './profile-sidebar.component.html',
  styleUrls: ['./profile-sidebar.component.scss']
})
export class ProfileSidebarComponent implements OnInit {


  constructor (
    private router: Router){}
  ngOnInit(): void {
  }

  onLogOut() {
    this.router.navigate(['home']).catch();
    localStorage.removeItem('token');
    localStorage.setItem('roles', '');
    localStorage.setItem('email', '');
  }
  
}
