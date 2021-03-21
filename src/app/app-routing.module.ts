import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RoleGuardService } from './services/role-guard-service.service';

const routes: Routes = [
  {
    path:"",
    component:HomePageComponent
  },
  {
    path:"confirm",
    component:ConfirmEmailComponent
  },
  {
    path:"groups",
    component:MainPageComponent,
    data: {
      expectedRole: 'USER'
    },
    canActivate: [RoleGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
