import { Component, OnInit } from '@angular/core';
import { ItemCreationDialogComponent } from '../item-creation-dialog/item-creation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {LoginComponent} from '../login/login.component';
import {AuthServiceService} from '../services/auth-service.service';
import {Router} from '@angular/router';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import { RegistrationComponent } from '../registration/registration.component';
import {RoleGuardService} from '../services/role-guard-service.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private bodyText: string;
  isMenuShown: boolean;
  showProfileSidebar:boolean=false;
  constructor(private dialog: MatDialog,
              private auth: AuthServiceService,
              private  router: Router,
              private roleGuardService: RoleGuardService
              ) {}

  ngOnInit(): void {

  }

  logInCheck(): boolean {
    if (!this.auth.isAuthenticated()) {
      return false;
    }
    return true;
  }

  // adminCheck(): boolean {
  //   if (
  //     this.logInCheck() && isNotNullOrUndefined(localStorage.getItem('roles'))
  //   ) {
  //     if (localStorage.getItem('roles').includes('ADMIN')) {
  //       return true;
  //     }
  //   }
  //   return false;

  // }
  toggleProfileSidebar() {
    this.showProfileSidebar=!this.showProfileSidebar;
  }

  openItemDialog(): void {
    this.dialog.open(ItemCreationDialogComponent);
  }

  redirect(path: string) {
    this.router.navigate([path]).catch();
    this.showHamburgerMenu();
  }

  onLogOut() {
    this.router.navigate(['']);
    localStorage.removeItem('token');
    localStorage.setItem('roles', '');
    localStorage.setItem('email', '');
    this.showHamburgerMenu();
  }

  openDialog() {
    this.dialog.open(RegistrationComponent);
    this.showHamburgerMenu();
  }
  openLoginDialog() {
    this.dialog.open(LoginComponent);
    this.showHamburgerMenu();
  }
  showHamburgerMenu(): void {
    this.isMenuShown = !this.isMenuShown;
    if (window.innerWidth > 1000) {
      this.isMenuShown = true;
    }
  }
  checkWindowWidth(): void {
    this.isMenuShown = window.innerWidth > 1000;
  }
}

