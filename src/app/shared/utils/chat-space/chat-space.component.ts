import { AfterContentInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-space',
  templateUrl: './chat-space.component.html',
  styleUrls: ['./chat-space.component.scss'],
})
export class ChatSpaceComponent implements OnInit, OnChanges {
  @Input() roomData: any = {};
  dataLoaded: boolean = false;
  Messages: any[] = [];
  UserId: string = '';
  RoomId: string = '';
  TrainerId: string = '';
  @Input() role: string = 'user';
  messageForm: FormGroup;

  constructor(private chatService: ChatService, private fb: FormBuilder) {
    this.messageForm = this.fb.group({
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Listen for incoming messages
    this.chatService.receiveMessages().subscribe((data) => {
      if (data) {
        // console.log(data, 'cat');
        console.log(this.Messages, 'cat');  
        
        this.Messages.push(data);
        console.log(this.Messages, 'dog');
      }
    });
  }

  ngOnChanges(): void {
    if (this.roomData) {
      this.UserId = this.roomData.UserId;
      this.TrainerId = this.roomData.TrainerId;
      this.dataLoaded = true;
      this.RoomId = this.roomData._id;
      
      // joining the room and loading previous messages
      this.chatService.joinRoom(this.UserId, this.TrainerId).subscribe((messages) => {
        this.Messages = messages; 
      });
    }
  }

  // send messages with role based execution
  sendMessage() {
    let senderId
    if(this.role === 'user'){
      senderId = this.UserId
    }else{
      senderId = this.TrainerId
    }
    if (this.messageForm.valid) {
      const message = this.messageForm.value.message;
      this.chatService.sendMessage(this.RoomId, message, senderId);
      this.messageForm.reset(); 
    }
  }

  private scrollToBottom() {
    setTimeout(() => {
      const messageContainer = document.querySelector('.messages-container');
      if (messageContainer) {
        messageContainer.scrollTop = messageContainer.scrollHeight;
      }
    }, 0);
  }
}
