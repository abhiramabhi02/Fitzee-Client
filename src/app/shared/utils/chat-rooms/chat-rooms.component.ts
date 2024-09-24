import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdminService } from 'src/app/features/admin/services/admin.service';
import { serverResponse } from '../../interfaces/response.interface';
import { MatDialog } from '@angular/material/dialog';
import { CreateRoomModalComponent } from '../create-room-modal/create-room-modal.component';
import { ChatService } from '../../services/chat.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-chat-rooms',
  templateUrl: './chat-rooms.component.html',
  styleUrls: ['./chat-rooms.component.scss']
})
export class ChatRoomsComponent implements OnInit {

  @Input() user: string = 'user';
  @Input() rooms: any[] = [];
  @Output() sendRoomData: EventEmitter<any> = new EventEmitter<any>();
  allUsers: any[] = []
  trainerId!: string 

  constructor(private adminService:AdminService, private dialog:MatDialog, private chatService:ChatService, private authService:AuthService){}

  ngOnInit(): void {
    const data = 'user'
    this.adminService.getAllItems(data).subscribe({
      next:(response:serverResponse)=>{
        this.allUsers = response.items
      },
      error:(err:Error)=>{
        console.log(err);
      }
    })
    const id = this.authService.getUserIdFromToken('trainer')
    if(id) this.trainerId = id
  }

  check(roomId: string) {
    const roomData = this.rooms.find(item => item._id === roomId);
    this.sendRoomData.emit(roomData);
  }

  getLastMessage(room: any): string {
    const lastMessage = room.Messages?.[room.Messages.length - 1]?.Message;
    return lastMessage ? lastMessage : 'No messages yet';
  }

  getLastTimestamp(room: any): string {
    const lastMessage = room.Messages?.[room.Messages.length - 1];
    if (lastMessage && lastMessage.TimeStamp) {
      const date = new Date(lastMessage.TimeStamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return '';
  }

   createRoom(){
    const dialogRef = this.dialog.open(CreateRoomModalComponent, {
      width: '400px',
      data: {users: this.allUsers}
    })

    dialogRef.afterClosed().subscribe({
      next:(result:any)=>{
        console.log(result, 'result');
        
        this.chatService.createRoom(result, this.trainerId).subscribe({
          next:(data)=>{
            if(data){
            console.log(data.showData, 'rooms');
            const newRoom = data.showData
            this.rooms.push(newRoom)
            }
          },
          error:(error)=>{
            console.log(error, 'err');
            
          }
        })
      }
    })
  }

}
