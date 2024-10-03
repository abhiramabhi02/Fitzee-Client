import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { serverResponse } from '../interfaces/response.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: Socket;
  private readonly SERVER_URL = environment.chat.CHAT_PORT_URL; 

  constructor(private httpClient:HttpClient) {
    this.socket = io(this.SERVER_URL);
  }

   // Fetch chat rooms for user or trainer
   getRooms(id: string, role: string): Observable<serverResponse> {
    const url = environment.chat.CHAT_BASE_URL + environment.chat.GET_ROOMS + `/${id}/${role}`;
    return this.httpClient.get<serverResponse>(url);
  }

  // Listen for connection event
  listenForConnection(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('connect', () => {
        observer.next({ message: 'Connected to the chat server', socketId: this.socket.id });
      });  
    });
  }

  // Create a new room for the user and trainer
  createRoom(userId: string, trainerId: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.emit('createRoom', { userId, trainerId });

      this.socket.on('roomCreated', (data) => {
        observer.next(data); // Data contains room data
      });

      this.socket.on('error', (error) => {
        observer.error(error); // Handle error if room already exists
      });
    });
  }

  // Join an existing room
  joinRoom(userId: string, trainerId: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.emit('joinRoom', { userId, trainerId });

      this.socket.on('previousMessages', (messages) => {
        observer.next(messages); 
      });

      this.socket.on('error', (error) => {
        observer.error(error); 
      });
    });
  }

  // Send a message to a private chat room
  sendMessage(roomId: string, message: string, senderId: string): void {
    this.socket.emit('privateMessage', { roomId, message, senderId });
  }

  // Listen for new messages from the server
  receiveMessages(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('receiveMessage', (data) => {
        observer.next(data); 
      });
    });
  }

  // Handle disconnection
  handleDisconnect(): void {
    this.socket.disconnect();
  }

  // Listen for disconnection events
  listenForDisconnection(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('disconnect', () => {
        observer.next({ message: 'Disconnected from the chat server' });
      });
    });
  }

  // get last messages from the room
  getLastMessage(room: any): string {
    const lastMessage = room.Messages?.[room.Messages.length - 1]?.Message;
    return lastMessage ? lastMessage : 'No messages yet';
  }

  //get last timestamp from the room
  getLastTimestamp(room: any): string {
    const lastMessage = room.Messages?.[room.Messages.length - 1];
    if (lastMessage && lastMessage.TimeStamp) {
      const date = new Date(lastMessage.TimeStamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return '';
  }
}

 