import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from '../shared/chat';
import { environment } from 'src/environments/environment';
import { Message } from '../shared/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  createChat(chat: Chat): Observable<Chat>{
    return this.http.post<Chat>(`${this.apiServerUrl}/isp/chat/add`, chat)
  }

  openChat(requestId: number): Observable<Chat>{
    return this.http.get<Chat>(`${this.apiServerUrl}/isp/chat/request/${requestId}`)
  }

  sendMessage(chat: number, text: string, email: string): Observable<Message>{
    let message = {chat, text}
    let data = {message, email}
    data.message.chat = chat;
    data.message.text = text;
    data.email = email;
    return this.http.post<Message>(`${this.apiServerUrl}/isp/chat/send_message`, data)
  }
}
