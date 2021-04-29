import { ElementRef, Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { Message } from '../shared/message';
import { ChatService } from '../services/chat.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WebSocketAPI } from '../web-socket-api';
@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChatDialogComponent implements OnInit {
  currentUser: string
  message: Message
  messageText: string
  messageBox: any
  currentMessages: Message[]
  webSocketAPI: WebSocketAPI;
  greeting: any;
  name: string;

  constructor(public chatService: ChatService,
              public snackBar: MatSnackBar,
              public router: Router,
              public chatDialog: MatDialogRef<ChatDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public chat: any) {
                this.currentMessages = chat.messages;
                this.currentUser = localStorage.getItem('email');
              }

  ngOnInit(): void {
    this.webSocketAPI = new WebSocketAPI(new ChatDialogComponent(this.chatService, this.snackBar, this.router, this.chatDialog, this.chat));
    this.webSocketAPI.topic += `/${this.chat.id}`;
    this.webSocketAPI.destination += `/message${this.webSocketAPI.topic}`;
    this.connect();
  }

  closeItemDialog(): void {
    this.disconnect();
    this.chatDialog.close(ChatDialogComponent);
  }

  connect(){
    this.webSocketAPI._connect();
  }

  disconnect(){
    this.webSocketAPI._disconnect();
  }

  handleMessage(message){
    message = JSON.parse(JSON.parse(message));
    this.currentMessages.push(message);
  }

  sendMessage(chatId: number, email: string){
    if(this.messageText){
      this.chatService.sendMessage(chatId, this.messageText, email).subscribe(
        (response: any) => {
          response.sender.email = this.currentUser;
          response.chat = chatId;
          this.messageText = '';
          this.webSocketAPI._send(response);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.snackBar.open("Could not send the message. Please try again.","✓",{
            duration: 400000000000000,
            panelClass: ['blue-snackbar']
          })
        }
      )
    }
  }
}
