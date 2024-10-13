import { Component, HostListener, OnInit } from '@angular/core';
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
  showChatRooms: boolean = true; 
  isMobile: boolean = false; 
  isDesktop: boolean = true;

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
