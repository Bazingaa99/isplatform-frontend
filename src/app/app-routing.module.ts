import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './groups/groups.component';
import { ItemsComponent } from './items/items.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RoleGuardService } from './services/role-guard-service.service';
import { WelcomeContentComponent } from './welcome-content/welcome-content.component';
import { RequestsPageComponent } from './requests-page/requests-page.component';
import { RequestedItemsComponent } from './requested-items/requested-items.component';

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
    path:"usersgroup",
    component:MainPageComponent,
    data: {
      expectedRole: 'USER'
    },
    canActivate: [RoleGuardService],
    children: [
      {
        path:'',
        component: WelcomeContentComponent
      },
      {
        path: ':id',
        component: ItemsComponent
      }
    ]
  },
  {
    path:"requesteditems",
    component:RequestsPageComponent,
  },
  {
    path:"myrequesteditems",
    component:RequestsPageComponent,
  },
  {
    path:"borroweditems",
    component:RequestsPageComponent,
  },
  {
    path:"lentitems",
    component:RequestsPageComponent,
  },
  {
    path: "**", component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = [MainPageComponent]
