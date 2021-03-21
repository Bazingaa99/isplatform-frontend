import {Component, OnInit, HostListener} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {Registration} from '../shared/registration';
import {UserService} from '../services/user.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CustomValidators} from '../services/custom-validators.service';
import {MatTooltipModule} from '@angular/material/tooltip';
import { SuccessfulRegistrationComponent } from '../successful-registration/successful-registration.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  arrCodes: string[];
  info: Registration;
  serverErrorMessage: string;
  passwordNotMatch: boolean;
  submission: boolean;
  isLoading = false;
  hide=true;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialog: MatDialogRef<any>,
    private tooltip:MatTooltipModule,
    private dialogNew: MatDialog,
    private spinner: MatProgressSpinnerModule) {
    this.registrationForm = this.setForm()
  }

  ngOnInit(): void {
    
  }

  validatePasswords(): boolean {
    if (this.passwordReg.value !== this.passwordRepeatReg.value &&
      this.passwordRepeatReg.value !== '') {
      return false;
    } else {
      return true;
    }
  }

  onSubmit() {
    this.passwordNotMatch = false;
    this.submission = false;
    this.isLoading = true;
    this.info = {
      user: {
        // id: Math.floor(Math.random() * 10),
        email: this.registrationForm.get('emailReg').value,
        username: this.registrationForm.get('usernameReg').value,
        password: this.registrationForm.get('passwordReg').value,
      }
    };

    if (this.info.user.password === this.registrationForm.get('passwordRepeatReg').value) {
      
      this.userService.submitRegistration(this.info).subscribe(
        () => {
          this.serverErrorMessage = '';
          this.registrationForm.reset();
          this.closeDialog();
          this.openDialog();
        },
        error => {console.log(error), this.isLoading = false, this.serverErrorMessage=error}
      );
    } else {  
      
      this.passwordNotMatch = true;
      this.submission = false;
    }
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

  setForm() {
    return this.fb.group({
      usernameReg:['',[
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3)
      ]],
      emailReg: ['', [
        Validators.required,
        Validators.maxLength(255),
        Validators.pattern('[a-zA-z0-9._%+-]+@[a-zA-z0-9.-]+\\.[a-zA-z]{2,4}$'),
      ]],
      passwordReg: ['', [
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
        Validators.maxLength(30)
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