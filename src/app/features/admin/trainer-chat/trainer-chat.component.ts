import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { serverResponse } from 'src/app/shared/interfaces/response.interface';
import { ChatService } from 'src/app/shared/services/chat.service';

@Component({
  selector: 'app-trainer-chat',
  templateUrl: './trainer-chat.component.html',
  styleUrls: ['./trainer-chat.component.scss']
})
export class TrainerChatComponent implements OnInit {
trainer:boolean = true
rooms:any[] = []
userId: string = '';
trainerId: string = '';
specifiedRoomData:any 

constructor(private chatService:ChatService, private authService:AuthService){}

ngOnInit(): void {
  const token = this.authService.getUserIdFromToken('trainer')
  if(token) this.trainerId = token
  const role = 'trainer'
  this.chatService.getRooms(this.trainerId, role).subscribe({
    next:(res:serverResponse)=>{
      this.rooms = res.items      
    }
  })
}

receiveRoomData(data:any){
  this.specifiedRoomData = data
}
}
