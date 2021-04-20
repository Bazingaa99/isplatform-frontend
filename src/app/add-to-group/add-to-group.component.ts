import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateUsersGroupsService } from '../services/update-users-group.service';
import { UserService } from '../services/user.service';
import { UsersGroupService } from '../services/users-group.service';
import { AddToGroupResponse } from '../shared/add-to-group-response';

@Component({
  selector: 'app-add-to-group',
  templateUrl: './add-to-group.component.html',
  styleUrls: ['./add-to-group.component.css']
})
export class AddToGroupComponent implements OnInit {

  private response:string
  private token:string
  constructor(private  router: Router,
              private route: ActivatedRoute,
              private updateUsersGroupsService: UpdateUsersGroupsService,
              private usersGroupService: UsersGroupService,
              private snackBar:MatSnackBar) { }

  ngOnInit(): void {
  
    this.token = this.route.snapshot.queryParams['t'];
    this.addToGroup(this.token);

    this.router.navigate(['usersgroup']);
  }
  addToGroup(token) {
    this.usersGroupService.addToGroup(token,localStorage.getItem('email')).subscribe(
      (response:AddToGroupResponse)=>{
        this.response=response.message;
        
        if (this.response=="You have successfully added to the group"){
          this.snackBar.open(this.response,"✓",{
            duration: 400000000000000,
            panelClass: ['green-snackbar']
          })
        }
        if (this.response=="Your invitation has expired"){
          this.snackBar.open("Your invitation has expired","✓",{
            duration: 400000000000000,
            panelClass: ['red-snackbar']
          })
        }
        if (this.response=="You are already in this group"){
          this.snackBar.open(this.response,"✓",{
            duration: 400000000000000,
            panelClass: ['yellow-snackbar']
          })
        }
        this.updateUsersGroupsService.sendUpdate();
      }
    )
  }
}
