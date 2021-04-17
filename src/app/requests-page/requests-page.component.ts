import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'requests-page',
  templateUrl: './requests-page.component.html',
  styleUrls: ['./requests-page.component.scss']
})
export class RequestsPageComponent implements OnInit {
  requestsId: string;
  myRequestsId: string;
  borrowedId: string;
  lentId: string;
  selectedId: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.selectedId =  this.router.url.substr(1, this.router.url.length);
    this.requestsId = "requesteditems";
    this.myRequestsId = "myrequesteditems";
    this.borrowedId = "borroweditems";
    this.lentId = "lentitems";
  }

  onSelect(url: string){
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate([url]);
    });
  }

}
