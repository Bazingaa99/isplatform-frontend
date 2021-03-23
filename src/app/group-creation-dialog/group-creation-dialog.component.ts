import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, NgForm, Validators }   from '@angular/forms';
import { UsersGroupService } from '../services/users-group.service';
import { UsersGroup } from '../shared/users-group';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../shared/user'
import { UpdateUsersGroupsService } from '../services/update-users-group.service'; 

@Component({
  selector: 'group-creation-dialog',
  templateUrl: 'group-creation-dialog.component.html',
  styleUrls: ['group-creation-dialog.component.scss',]
})
export class GroupCreationDialogComponent {
  userCreationForm: FormGroup;
  usersGroup: UsersGroup;
  public userId: number;

  constructor(private router: Router, private fb: FormBuilder, 
              private usersGroupService: UsersGroupService, 
              public dialog: MatDialogRef<GroupCreationDialogComponent>,
              private userService: UserService,
              private updateUsersGroupsService: UpdateUsersGroupsService) {
    this.userCreationForm = this.setForm();
   }  
   
  ngOnInit(): void {
    this.getUserId();
  }

  public getUserId(): void {
    this.userService.getUserByEmail(localStorage.getItem('email')).subscribe(
      (response: User) => {
        this.userId = response.id;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  closeDialog(): void {
    this.dialog.close(GroupCreationDialogComponent);
  }

  onSubmit(): void {
    this.closeDialog();
    console.log(this.userId);
    this.usersGroup = {
      admin_id: this.userId,
      name: this.userCreationForm.get('name').value,
      description: this.userCreationForm.get('description').value,
    }

    this.usersGroupService.createUsersGroups(this.usersGroup).subscribe(
      (response: UsersGroup) => {
        this.updateUsersGroupsService.sendUpdate();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  setForm() {
    return this.fb.group({
      name: ['', [
        Validators.required,
        Validators.maxLength(30),
      ]],
      description: ['', [
        Validators.maxLength(100),
      ]],
    });
  }
}
