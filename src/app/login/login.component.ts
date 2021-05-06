import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginInfo} from '../shared/login';
import {UserService} from '../services/user.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {RoleGuardService} from '../services/role-guard-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../shared/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private roleGuardService: RoleGuardService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<any>) {
    this.loginForm = this.setForm();
  }

  loginInfo: LoginInfo;
  serverErrorMessage: string;
  passwordNotMatch: boolean;
  submission: boolean;


  ngOnInit(): void {
    this.serverErrorMessage = '';
  }

  onSubmit() {
    this.serverErrorMessage = '';
    this.passwordNotMatch = false;
    this.submission = false;
    this.isLoading = true;
    this.loginInfo = {
      email: this.loginForm.get('emailLogin').value,
      password: this.loginForm.get('passwordLogin').value,

    };
    this.userService.submitLogin(this.loginInfo).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('email', response.email);
        this.roleGuardService.setRole(response.token);
        this.serverErrorMessage = '';
        this.closeDialog('login');
        if (localStorage.getItem('roles').includes('USER')) {
          this.setNewUsername();
          this.router.navigate(['usersgroup']);
        }
      },

      (error:HttpErrorResponse) => {
        this.isLoading=false;
        if(error.status==401){
          this.serverErrorMessage="Wrong credentials";
        }
        else{
          let errors = error.error.errors;
          for(let i = 0; i < errors.length; i++){
            this.serverErrorMessage += errors[i].defaultMessage + "\n"
          }  
        }
      }
    );
  }

  closeDialog(id: string) {
    this.dialogRef.close(id);
  }


  setForm() {
    return this.fb.group({
      emailLogin: ['', [
        Validators.required,
        Validators.maxLength(30),
        Validators.pattern('[a-zA-z0-9._%+-]+@[a-zA-z0-9.-]+\\.[a-zA-z]{2,4}$'),
      ]],
      passwordLogin: ['', [
        Validators.required,
        Validators.maxLength(30)
      ]],

    });
  }

  public setNewUsername(){
    this.userService.getUserByEmail(localStorage.getItem('email')).subscribe(
      (response: User) => {
        if(localStorage.getItem('username') != null) localStorage.removeItem('username');
        localStorage.setItem('username', response.username);
      },
      (error: HttpErrorResponse) => {
        alert(error);
      }
    );
  }
}
