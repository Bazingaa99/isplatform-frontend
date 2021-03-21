import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GroupsComponent } from './groups/groups.component';

import { HttpClientModule } from '@angular/common/http';

import { GroupsService } from './groups.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { GroupCreationDialogComponent } from './group-creation-dialog/group-creation-dialog.component';
import { HomePageComponent } from './home-page/home-page.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AuthGuardService} from './services/auth-guard.service';
import {AuthServiceService} from './services/auth-service.service';
import {RoleGuardService} from './services/role-guard-service.service';
import { MainPageComponent } from './main-page/main-page.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ProfileSidebarComponent } from './profile-sidebar/profile-sidebar.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { AlertModule } from 'ngx-alerts';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {JwtHelperService} from '@auth0/angular-jwt';
import { SuccessfulRegistrationComponent } from './successful-registration/successful-registration.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
@NgModule({
  declarations: [
    AppComponent,
    GroupsComponent,
    GroupCreationDialogComponent,
    HomePageComponent,
    MainPageComponent,
    FooterComponent,
    HeaderComponent,
    ProfileSidebarComponent,
    LoginComponent,
    RegistrationComponent,
    ConfirmEmailComponent,
    SuccessfulRegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatTooltipModule,
    AlertModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    AlertModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  providers: [GroupsService, 
    JwtHelperService,
    RoleGuardService,
    AuthServiceService,
    AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
