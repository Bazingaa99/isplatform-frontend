import { Component, OnInit } from '@angular/core';
import { ItemCreationDialogComponent } from '../item-creation-dialog/item-creation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {LoginComponent} from '../login/login.component';
import {AuthServiceService} from '../services/auth-service.service';
import {Router} from '@angular/router';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import { RegistrationComponent } from '../registration/registration.component';
import {RoleGuardService} from '../services/role-guard-service.service';
import { UsersGroupService } from '../services/users-group.service';
import { AddToGroupToken } from '../shared/add-to-group-token';
import { InviteToGroupComponent } from '../invite-to-group/invite-to-group.component';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private groupId: string;
  private bodyText: string;
  showProfileSidebar:boolean;
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
  }

  onLogOut() {
    this.router.navigate(['']);
    localStorage.removeItem('token');
    localStorage.setItem('roles', '');
    localStorage.setItem('email', '');
  }

  onClick(){
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/usersgroup']);
    });
  }


  openDialog() {
    this.dialog.open(RegistrationComponent);
  }

  openLoginDialog() {
    this.dialog.open(LoginComponent);
  }
  openInviteDialog() {
    this.dialog.open(InviteToGroupComponent);
  }
}

