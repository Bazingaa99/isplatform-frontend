import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GroupsComponent } from './groups/groups.component';
import { ItemComponent } from './item/item.component';
import { GroupsService } from './groups.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { GroupCreationDialogComponent } from './group-creation-dialog/group-creation-dialog.component';
import { MainPageComponent } from './main-page/main-page.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ProfileSidebarComponent } from './profile-sidebar/profile-sidebar.component';
import { ItemService } from './services/item/item.service';


@NgModule({
  declarations: [
    AppComponent,
    GroupsComponent,
    GroupCreationDialogComponent,
    MainPageComponent,
    FooterComponent,
    HeaderComponent,
    ProfileSidebarComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [GroupsService, ItemService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
