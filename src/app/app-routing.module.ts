import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { AppComponent } from './app.component';

const routes: Routes = [

=======
import { GroupsComponent } from './groups/groups.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  //{path: 'usersgroup/:id', component: GroupsComponent}, // <- idek savo componenta
  {path: "**", component: PageNotFoundComponent}
>>>>>>> 7320a4247998bd002dce36122873c348e8cf4422
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = [MainPageComponent]