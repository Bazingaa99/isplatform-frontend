import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <img class="center" src="https://i.stack.imgur.com/6M513.png" alt="404 page not found">
  `,
  styles: [`
  .center {
    display: block;
    padding-top: 5%;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 7%;
  }
  `]
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
