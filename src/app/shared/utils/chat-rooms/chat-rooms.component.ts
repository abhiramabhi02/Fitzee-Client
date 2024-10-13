import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AdminService } from 'src/app/features/admin/services/admin.service';
import { serverResponse } from '../../interfaces/response.interface';
import { MatDialog } from '@angular/material/dialog';
import { CreateRoomModalComponent } from '../create-room-modal/create-room-modal.component';
import { ChatService } from '../../services/chat.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { TrainerService } from 'src/app/features/admin/trainer/services/trainer.service';

@Component({
  selector: 'app-chat-rooms',
  templateUrl: './chat-rooms.component.html',
  styleUrls: ['./chat-rooms.component.scss']
})
export class ChatRoomsComponent implements OnInit, OnChanges {

  @Input() user: string = 'user';
  @Input() rooms: any[] = [];
  @Output() sendRoomData: EventEmitter<any> = new EventEmitter<any>();
  roomData: any[] = []
  allUsers: any[] = []
  trainerId!: string 

  constructor(private service:TrainerService, private dialog:MatDialog, private chatService:ChatService, private authService:AuthService){}

  ngOnInit(): void {
    const data = 'user'
    // this.service.getAllItems(data).subscribe({
    //   next:(response:serverResponse)=>{
    //     this.allUsers = response.items
    //   },
    //   error:(err:Error)=>{
    //     console.log(err);
    //   }
    // })
    const id = this.authService.getUserIdFromToken('trainer')
    if(id) this.trainerId = id
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.rooms[0]){
      this.roomData = this.rooms
    }
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

  search(value:string){
    console.log(this.roomData);
     console.log(value);
      
    if(value === ""){
      this.roomData = this.rooms 
    }else{
      let userName:string = ''
      if(this.user === 'user'){
        userName = 'trainerDetails'
      }else{
        userName = 'userDetails'
      }
      // let filteredData = this.rooms.filter((item) => item[userName]?.Name?.toLowerCase().includes(value.toLowerCase()))
      let filteredData: any[] = []
      this.rooms.filter((item)=>{
        console.log('user');
        if(item[userName].Name.toLowerCase().includes(value.toLowerCase())){
          filteredData.push(item)
        }
      })
      this.roomData = filteredData
      console.log(this.roomData);
    }
  }

}
