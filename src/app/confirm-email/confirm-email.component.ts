import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';  
import { AlertService } from 'ngx-alerts';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmEmailResponse } from '../shared/confirm-email-response';
import {MatSnackBar} from '@angular/material/snack-bar'; 
@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {
  public emailStatus: ConfirmEmailResponse ;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService:UserService,
    private alertService:AlertService,
    private snackBar:MatSnackBar
    ) 
    { }

  ngOnInit(): void {
    
    this.router.navigate(['']);
    console.log(this.route);
    const token = this.route.snapshot.queryParams['token'];
    this.confirmEmail(token);
  }

  confirmEmail(token) {
    this.userService.confirmEmail(token).subscribe(
      (response:ConfirmEmailResponse)=>{
        this.emailStatus=response;
        this.alertService.success('Email Confirmed');
        console.log(this.emailStatus.resultOfTheVerification)
        if (this.emailStatus.resultOfTheVerification=="Email is already confirmed"){
          this.snackBar.open(this.emailStatus.resultOfTheVerification,"✓",{
            duration: 400000000000000,
            panelClass: ['blue-snackbar']
          })
        }
        if (this.emailStatus.resultOfTheVerification=="Token expired"){
          this.snackBar.open("Email confirmation has expired, please register again","✓",{
            duration: 400000000000000,
            panelClass: ['red-snackbar']
          })
        }
        if (this.emailStatus.resultOfTheVerification=="Email is confirmed"){
          this.snackBar.open(this.emailStatus.resultOfTheVerification,"✓",{
            duration: 400000000000000,
            panelClass: ['green-snackbar']
          })
        }
      }
    )
  }
}