import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  userIsUpdatingGroup = false;
  adminId: number;
  groupCode: string;

  constructor(private fb: FormBuilder, 
              private usersGroupService: UsersGroupService, 
              public dialog: MatDialogRef<GroupCreationDialogComponent>,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public groupId: number,
              private updateUsersGroupsService: UpdateUsersGroupsService) {
    this.userCreationForm = this.setForm();
   }  
   
  ngOnInit(): void {
    if(this.groupId != null){
      this.getGroupData();
      var div = document.getElementById('title');
      div.innerHTML = div.innerHTML.replace("New group creation","Group update");
      div = document.getElementById('creation-button');
      div.innerHTML = div.innerHTML.replace('Create','Update');
    }
  }

  closeDialog(): void {
    this.dialog.close(GroupCreationDialogComponent);
  }

  onCreateGroup(): void {
    this.closeDialog();
    if(this.userIsUpdatingGroup){
      this.usersGroup = {
        id: this.groupId,
        admin_id: this.adminId,
        name: this.userCreationForm.get('name').value,
        description: this.userCreationForm.get('description').value,
      }
      this.usersGroupService.updateUsersGroups(this.usersGroup, localStorage.getItem('email')).subscribe(
        (response: UsersGroup) => {
          this.updateUsersGroupsService.sendUpdate();
          this.snackBar.open("Group successfuly updated","✓",{
            duration: 400000000000000,
            panelClass: ['green-snackbar']
          })
        },
        (error: HttpErrorResponse) => {
          this.snackBar.open("Couldn't update a group. Please try again.","✓",{
            duration: 400000000000000,
            panelClass: ['red-snackbar']
          })
        }
      );
    }
    else {
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

  public getGroupData(){
    this.usersGroupService.getGroupData(this.groupId).subscribe(
      (response: UsersGroup) => {
        this.userCreationForm.patchValue({ name: response.name,
          description: response.description,
        });
        this.adminId = response.admin_id;
        this.userIsUpdatingGroup = true;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
