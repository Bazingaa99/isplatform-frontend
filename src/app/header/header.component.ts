import { Component, OnInit } from '@angular/core';
import { ItemCreationDialogComponent } from '../item-creation-dialog/item-creation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {LoginComponent} from '../login/login.component';
import {AuthServiceService} from '../services/auth-service.service';
import {Router,ActivatedRoute} from '@angular/router';
import { RegistrationComponent } from '../registration/registration.component';
import {RoleGuardService} from '../services/role-guard-service.service';
import { InviteToGroupComponent } from '../invite-to-group/invite-to-group.component';
import { ItemsComponent } from '../items/items.component';
import { ItemService } from '../services/item.service';
import { User } from '../shared/user';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../services/notification';
import { UpdateUsersGroupsService } from '../services/update-users-group.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentRout: string;
  groupId: string;
  bodyText: string;
  showProfileSidebar:boolean;
  userId: number;  
  hidden = false;
  notificationsCount: number;
  updateEventSubscription: any;

  constructor(private dialog: MatDialog,
              private auth: AuthServiceService,
              private  router: Router,
              private userService: UserService,
              private roleGuardService: RoleGuardService,
              private notificationService: NotificationService,
              private updateService: UpdateUsersGroupsService) {
                this.updateEventSubscription = this.updateService.getUpdate().subscribe(()=>{
                  this.getUserNotificationsCount();
                });
              }

  ngOnInit(): void {
    this.getUserNotificationsCount();
  }

  update(){
    this.updateService.sendUpdate();
  }

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
  isGroupOpened():boolean{
    var mainpageUrlSegment = this.router.url.slice(1, 11)
    this.groupId = this.router.url.slice(12, this.router.url.length)
    if(this.groupId ==='' || mainpageUrlSegment!=='usersgroup'){
      return false
    }else{
      return true
    }
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

  goToUserProfile(){
    let url = "/profile/" + localStorage.getItem('userId');
    this.router.navigateByUrl(url);
  }

  onLogOut() {
    this.router.navigate(['']);
    localStorage.removeItem('token');
    localStorage.setItem('roles', '');
    localStorage.setItem('email', '');
    localStorage.removeItem('username');
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
  
  public getUserNotificationsCount(): void {
    this.notificationService.getUserNotificationsCount(Number(localStorage.getItem('userId'))).subscribe(
      (response: number) => {
        this.notificationsCount = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}

