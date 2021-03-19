import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showProfileSidebar:boolean=false;

  ngOnInit(): void {
  }

  toggleProfileSidebar() {
    this.showProfileSidebar=!this.showProfileSidebar;
  }
}
