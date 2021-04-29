import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';

export class WebSocketAPI {
    webSocketEndPoint: string = 'http://localhost:8080/isp/ws';
    topic: string = "/chat";
    destination: string = "/app";
    stompClient: any;
    chatDialog: ChatDialogComponent;
    constructor(chatDialog: ChatDialogComponent){
        this.chatDialog = chatDialog;
    }
    _connect() {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame) {
            _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
                _this.onMessageReceived(sdkEvent);
            });
            //_this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);
    };

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this._connect();
        }, 5000);
    }

    _send(message) {
        console.log("calling logout api via web socket");
        this.stompClient.send(this.destination, {}, JSON.stringify(message));
    }

    onMessageReceived(message) {
        this.chatDialog.handleMessage(JSON.stringify(message.body));
    }
}
