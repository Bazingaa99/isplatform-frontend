import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GroupsComponent } from './groups/groups.component';
import { ItemsComponent } from './items/items.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { GroupCreationDialogComponent } from './group-creation-dialog/group-creation-dialog.component';
import { ItemCreationDialogComponent } from './item-creation-dialog/item-creation-dialog.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthServiceService } from './services/auth-service.service';
import { RoleGuardService } from './services/role-guard-service.service';
import { MainPageComponent } from './main-page/main-page.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {  JwtHelperService } from '@auth0/angular-jwt';
import { SuccessfulRegistrationComponent } from './successful-registration/successful-registration.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatDividerModule } from '@angular/material/divider';
import { WelcomeContentComponent } from './welcome-content/welcome-content.component';
import { ItemDialogComponent } from './item-dialog/item-dialog.component'
import { MatCheckboxModule } from '@angular/material/checkbox';
@NgModule({
  declarations: [
    AppComponent,
    GroupsComponent,
    GroupCreationDialogComponent,
    HomePageComponent,
    MainPageComponent,
    FooterComponent,
    HeaderComponent,
    ItemsComponent,
    ItemsComponent,
    ItemCreationDialogComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegistrationComponent,
    ConfirmEmailComponent,
    SuccessfulRegistrationComponent,
    WelcomeContentComponent,
    ItemDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatGridListModule,
    MatMenuModule,
    MatSelectModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatIconModule,
    MatCheckboxModule
  ],
  exports: [ ItemsComponent ],
  providers: [,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    JwtHelperService,
    RoleGuardService,
    AuthServiceService,
    AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
