import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../services/request.service';
import { Request } from '../shared/request';
import { PageEvent } from '@angular/material/paginator';
import { UpdateUsersGroupsService } from '../services/update-users-group.service';
import { Subscription } from 'rxjs';
import { RequestedItemDialogComponent } from '../requested-item-dialog/requested-item-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'requested-items',
  templateUrl: './requested-items.component.html',
  styleUrls: ['./requested-items.component.scss']
})
export class RequestedItemsComponent implements OnInit {

  public requests: Request[]; // Requests for current user
  public requestsLength: number;
  public pageSize: number;
  public pageSlice;
  public groupId: string;
  public updateEventSubscription: Subscription;
  public currentUserEmail: string;

  constructor(private dialog: MatDialog,
              private requestService: RequestService,
              private router: Router,
              private updateService: UpdateUsersGroupsService) {
                this.updateEventSubscription = this.updateService.getUpdate().subscribe(()=>{
                  this.getRequests();
                });
              }

  ngOnInit(): void {
    this.pageSize = 12;
    this.requestsLength = 0;
    this.currentUserEmail = localStorage.getItem('email');
    this.getRequests();
    console.log(this.router.url);
  }

  public getRequests(): void {
    switch(this.router.url){
      case '/requesteditems':
        this.getOtherRequests()
        break
      case '/myrequesteditems':
        this.getMyRequests()
        break
      case '/borroweditems':
        this.getMyRequests(true)
        break
      case '/lentitems':
        this.getOtherRequests(true)
        break
      default:
        break
    }
  }

  public getOtherRequests(accepted?: boolean): void {
    this.requestService.getRequestsByOwnerEmail(localStorage.getItem('email'), accepted).subscribe(
      (response: Request[]) => {
        this.requests = response;
        this.requestsLength = this.requests.length;
        this.pageSlice = this.requests.slice(0, this.pageSize);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getMyRequests(accepted?: boolean): void {
    this.requests = [];
    this.requestService.getRequestsByRequesterEmail(localStorage.getItem('email'), accepted).subscribe(
      (response: Request[]) => {
        this.requests = response;

        this.requestsLength = this.requests.length;
        this.pageSlice = this.requests.slice(0, this.pageSize);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  

  checkIfOwner(itemData): any {
    return (itemData.owner['email'] === localStorage.getItem('email'))
  }

  public onPageChange(event: PageEvent){
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if(endIndex > this.requests.length){
      endIndex = this.requests.length;
    }

    this.pageSlice = this.requests.slice(startIndex, endIndex);
  }

  openItemDialog(requestData): void {
    this.dialog.open(RequestedItemDialogComponent, {
      data: requestData
    });
  }

}
