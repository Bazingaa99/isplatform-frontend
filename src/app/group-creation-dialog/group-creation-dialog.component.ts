import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersGroupService } from '../services/users-group.service';
import { UsersGroup } from '../shared/users-group';
import { HttpErrorResponse } from '@angular/common/http';
import { UpdateUsersGroupsService } from '../services/update-users-group.service'; 
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'group-creation-dialog',
  templateUrl: 'group-creation-dialog.component.html',
  styleUrls: ['group-creation-dialog.component.scss',]
})
export class GroupCreationDialogComponent {
  userCreationForm: FormGroup;
  usersGroup: UsersGroup;

  constructor(private fb: FormBuilder, 
              private usersGroupService: UsersGroupService, 
              public dialog: MatDialogRef<GroupCreationDialogComponent>,
              private snackBar: MatSnackBar,
              private updateUsersGroupsService: UpdateUsersGroupsService) {
    this.userCreationForm = this.setForm();
   }  
   
  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialog.close(GroupCreationDialogComponent);
  }

  onCreateGroup(): void {
    this.closeDialog();
    this.usersGroup = {
      name: this.userCreationForm.get('name').value,
      description: this.userCreationForm.get('description').value,
    }

    this.usersGroupService.createUsersGroups(this.usersGroup, localStorage.getItem('email')).subscribe(
      (response: UsersGroup) => {
        this.updateUsersGroupsService.sendUpdate();
        this.snackBar.open("Group successfuly created","✓",{
          duration: 400000000000000,
          panelClass: ['green-snackbar']
        })
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open("Couldn't create a group. Please try again.","✓",{
          duration: 400000000000000,
          panelClass: ['red-snackbar']
        })
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
