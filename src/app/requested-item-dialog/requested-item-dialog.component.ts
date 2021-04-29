import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemCreationDialogComponent } from '../item-creation-dialog/item-creation-dialog.component';
import { RequestService } from '../services/request.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ItemService } from '../services/item.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateUsersGroupsService } from '../services/update-users-group.service';
import { Chat } from '../shared/chat';
import { ChatService } from '../services/chat.service';
import { Request } from '../shared/request';
import { ChatDialogComponent } from '../chat-dialog/chat-dialog.component';

@Component({
  selector: 'requested-item-dialog',
  templateUrl: './requested-item-dialog.component.html',
  styleUrls: ['./requested-item-dialog.component.scss']
})
export class RequestedItemDialogComponent implements OnInit {
  currentUserEmail: string;
  isItemRequested: boolean;
  chat: Chat;
  req: Request;

  constructor( public dialog: MatDialog,
                public chatDialog: MatDialogRef<ChatDialogComponent>,
                public requestedItemDialog: MatDialogRef<RequestedItemDialogComponent>,
                public requestService: RequestService,
                public itemService: ItemService,
                public chatService: ChatService,
                public router: Router,
                public updateService: UpdateUsersGroupsService,
                public snackBar: MatSnackBar,
                @Inject(MAT_DIALOG_DATA) public request: any ) {}

  ngOnInit(): void {
    this.currentUserEmail = localStorage.getItem('email')
  }

  openItemUpdateDialog(itemData): void {
    this.dialog.open(ItemCreationDialogComponent, {
      data: itemData,
    });
  }

  closeItemDialog(): void {
    this.requestedItemDialog.close(RequestedItemDialogComponent);
  }

  removeRequest(requestId: number){
    this.requestService.deleteRequest(requestId).subscribe(
      () => {
        this.updateService.sendUpdate();
        this.snackBar.open("Request removed","✓",{
          duration: 400000000000000,
          panelClass: ['green-snackbar']
        })
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open("Could not remove request, please try again.","✓",{
          duration: 400000000000000,
          panelClass: ['red-snackbar']
        })
      }
    )
  }

  dueDate(date: string, days: number) {
    var dueDate = new Date(date);
    dueDate.setDate(dueDate.getDate() + days);
    var result = dueDate.toISOString().split('T')[0]
    return result;
  }

  responseToRequest(requestId: number, acceptance: boolean){
    console.log(acceptance,requestId)
    this.requestService.responseToRequest(requestId, acceptance).subscribe(
      () => {
        this.updateService.sendUpdate();
        this.snackBar.open("You have succesfully responded","✓",{
          duration: 400000000000000,
          panelClass: ['green-snackbar']
        })
      })
  }

  openChat(requestId: number){
    this.chatService.openChat(requestId).subscribe(
      (response: Chat) => {
        if(response){
          console.log(response);
          this.openChatDialog(response);
        }else{
          this.req = {
            id: requestId
          }

          this.chat = {
            request: this.req
          }
          this.chatService.createChat(this.chat).subscribe(
            (response: Chat) => {
              console.log(response);
              this.openChatDialog(response);
            },
            (error: HttpErrorResponse) => {
              console.log(error);
              this.snackBar.open("Coould not open chat window. Please try again.","✓",{
                duration: 400000000000000,
                panelClass: ['red-snackbar']
              })
            }
          )
        }

      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.snackBar.open("Could not open chat window. Please try again.","✓",{
          duration: 400000000000000,
          panelClass: ['red-snackbar']
        })
      }
    )
  }

  openChatDialog(chat: Chat): void {
    this.dialog.open(ChatDialogComponent, {
      panelClass: 'no-padding-dialog',
      data: chat,
      restoreFocus: true,
      disableClose: true,
      position: {right: '12.5em', bottom: '2em'}
    });
  }
}
