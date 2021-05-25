import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RegistrationComponent } from '../registration/registration.component';
import { CustomValidators } from '../services/custom-validators.service';
import { UserService } from '../services/user.service';
import { Registration } from '../shared/registration';
import { User } from '../shared/user';
import { SuccessfulRegistrationComponent } from '../successful-registration/successful-registration.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  registrationForm: FormGroup;
  arrCodes: string[];
  info: Registration;
  serverErrorMessageForPassword: string;
  serverErrorMessage: string;
  passwordNotMatch: boolean;
  submission: boolean;
  isLoading = false;
  hide=true;
  serverErrorMessageHidden:boolean;
  serverErrorMessageForPasswordHidden:boolean;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialog: MatDialogRef<any>,
    private tooltip:MatTooltipModule,
    private dialogNew: MatDialog,
    private spinner: MatProgressSpinnerModule,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public updatableUserData: User) {
    this.registrationForm = this.setForm() 
    console.log(updatableUserData)
  }

  ngOnInit(): void {
    this.registrationForm.patchValue({usernameReg: this.updatableUserData.username,
       emailReg: this.updatableUserData.email
    });
  }

  public static matchValues(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
}
onSubmitPasswordChange() {
    this.serverErrorMessageForPassword=""
    this.passwordNotMatch = false;
    this.submission = false;
    this.isLoading = true;

      this.userService.onSubmitPasswordChange(localStorage.getItem('email'),this.registrationForm.get('oldPassword').value, this.registrationForm.get('newPassword').value,).subscribe(
        () => {
         
          this.serverErrorMessageForPassword = '';
          this.registrationForm.reset();
          this.closeDialog();
          this.snackBar.open("Password successfuly changed","✓",{
            duration: 400000000000000,
            panelClass: ['green-snackbar']
          })
        },
        (error:HttpErrorResponse) =>{
          this.isLoading=false
          this.serverErrorMessageForPassword=error.error.message
        }
      );
  }

  openDialog() {
    this.dialogNew.open(SuccessfulRegistrationComponent);
  }
  closeDialog() {
    this.registrationForm.reset();
    this.registrationForm = this.setForm();
    this.dialog.close(RegistrationComponent);
  }


  getTrueFalse(id: string) {
    const value = this.registrationForm.get(id).value;
    if (value === 'true' || value === true) {
      return true;
    } else {
      return false;
    }
  }
  onSubmitUserData(){
    this.serverErrorMessage=""
    this.isLoading = true;
    this.info = {
      user: {
        email: this.registrationForm.get('emailReg').value,
        username: this.registrationForm.get('usernameReg').value,
        oldEmail:localStorage.getItem('email')
      
      }
    };
    this.userService.updateUser(this.info.user).subscribe(
      ()=>{
        localStorage.setItem('email',this.info.user.email)
        this.isLoading=false;
        this.snackBar.open("User successfuly changed","✓",{
          duration: 400000000000000,
          panelClass: ['green-snackbar']
        })
        this.closeDialog
      },
      (error)=>{
        this.serverErrorMessageHidden=true
        this.isLoading=false
        this.serverErrorMessage=error.error.message
      }
    )
    
  }

  setForm() {
    return this.fb.group({
      usernameReg:['',[
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3)
      ]],
      emailReg: ['', [
        // Validators.required,
        Validators.maxLength(255),
        Validators.pattern('[a-zA-z0-9._%+-]+@[a-zA-z0-9.-]+\\.[a-zA-z]{2,4}$'),
      ]],
      oldPassword: ['', [
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(7),
      ]],
      newPassword: ['', [
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(7),
        CustomValidators.patternValidator(/\d/, {hasNumber: true}),
        CustomValidators.patternValidator(/[A-Z]/, {hasCapitalCase: true}),
        CustomValidators.patternValidator(/[a-z]/, {hasSmallCase: true}),
        CustomValidators.patternValidator(/^\S*$/, {hasGaps: true}),
      ]],
      passwordRepeatReg: ['', [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(30),
        RegistrationComponent.matchValues('newPassword')
      ]],

    });
  }


  get passwordReg() {
    return this.registrationForm.get('passwordReg');
  }

  get passwordRepeatReg() {
    return this.registrationForm.get('passwordRepeatReg');
  }

}
