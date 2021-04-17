import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersGroupService } from '../services/users-group.service';
import { AddToGroupToken } from '../shared/add-to-group-token';

@Component({
  selector: 'app-invite-to-group',
  templateUrl: './invite-to-group.component.html',
  styleUrls: ['./invite-to-group.component.css']
})
export class InviteToGroupComponent implements OnInit {

  groupId: string;
  link: string;
  constructor(private  router: Router,
              private usersGroupService: UsersGroupService,
    ) { }

  ngOnInit(): void {
    this.getAddToGroupToken()
  }
  
  getAddToGroupToken(): void {
  
    this.groupId = this.router.url.slice(12, this.router.url.length);
    this.usersGroupService.getAddToGroupToken(this.groupId, localStorage.getItem('email')).subscribe( 
      (response:AddToGroupToken)=>{
      console.log(response)
      this.link = "localhost:4200/inv?t="+response.token; 
      }
    );
    }

}
