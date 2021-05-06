import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  username: string;

  constructor() { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
  }

}
