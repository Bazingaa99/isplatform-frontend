import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'welcome-content',
  template: `
    <div id="welcome-div"><b>WELCOME!</b></div>
  `,
  styles: [`
    #welcome-div{
      height: 100%;
      font-size: 250%;
      color: white;
      background-image: url("https://b8g9x2x5.rocketcdn.me/wp-content/uploads/2018/08/team-teamwork-together-ss-1920_b1tngv.jpg");
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `]
})

export class WelcomeContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
