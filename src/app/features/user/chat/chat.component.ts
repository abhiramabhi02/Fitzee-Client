import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { serverResponse } from 'src/app/shared/interfaces/response.interface';
import { ChatService } from 'src/app/shared/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  userLogged: boolean = true;
  loggedIn: Boolean = true;
  roomId: string = 'user1-trainer1'; 
  userId: string = '';
  trainerId: string = '';
  message: string = '';
  rooms:any[] = []
  specificRoomData:any
  messages: { message: string; senderId: string }[] = [];

  constructor(private chatService:ChatService, private authService:AuthService){}

  ngOnInit(): void {
   const token = this.authService.getUserIdFromToken('user')
   if(token) this.userId = token
   const role = 'user'
   this.chatService.getRooms(this.userId, role).subscribe({
    next:(res:serverResponse)=>{
      this.rooms = res.items
    },
   })    
  }

  fetchRoomData(data:any){
    this.specificRoomData = data
  }

}



// this.chatService.joinRoom(this.roomId, this.userId, this.trainerId)

    // this.chatService.getPreviousMessage().subscribe((previousMessage)=>{
    //   console.log('te');
      
    //   console.log(previousMessage, 'pte');
      
    //   this.messages = [...this.messages, ...previousMessage]
    // })

    // this.chatService.onMessageReceived().subscribe((data)=>{
    //   this.messages.push(data)
    // })