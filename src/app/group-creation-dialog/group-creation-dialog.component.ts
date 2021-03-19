import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, NgForm, Validators }   from '@angular/forms';
import { UsersGroupService } from '../services/users-group.service';
import { UsersGroup } from '../shared/users-group';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'group-creation-dialog',
  templateUrl: 'group-creation-dialog.component.html',
  styleUrls: ['group-creation-dialog.component.scss',]
})
export class GroupCreationDialogComponent {
  userCreationForm: FormGroup;
  usersGroup: UsersGroup;

  constructor(private router: Router, private fb: FormBuilder, private usersGroupService: UsersGroupService, public dialog: MatDialogRef<GroupCreationDialogComponent>) {
    this.userCreationForm = this.setForm();
   }

  closeDialog(): void {
    this.dialog.close(GroupCreationDialogComponent);
  }

  onSubmit(): void {
    this.closeDialog();

    this.usersGroup = {
      admin_id: 1, // userio id
      name: this.userCreationForm.get('name').value,
      description: this.userCreationForm.get('description').value,
    }

    this.usersGroupService.createUsersGroups(this.usersGroup).subscribe(
      (response: UsersGroup) => {
        this.usersGroupService.getUsersGroups();
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
