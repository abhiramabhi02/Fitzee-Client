import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { send } from 'process';
import { read } from 'fs';
import { Observable } from 'rxjs';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-chat-space',
  templateUrl: './chat-space.component.html',
  styleUrls: ['./chat-space.component.scss'],
})
export class ChatSpaceComponent implements OnInit, OnChanges, OnDestroy {
  @Input() roomData: any = {};
  dataLoaded: boolean = false;
  Messages: any[] = [];
  UserId: string = '';
  RoomId: string = '';
  TrainerId: string = '';
  @Input() role: string = '';
  messageForm: FormGroup;
  userTyping: boolean = false;
  trainerTyping: boolean = false;
  typingTimer: any;
  currentRoomId: string = '';
  userChatActive: boolean = false;
  trainerChatActive: boolean = false;

  constructor(
    private chatService: ChatService,
    private fb: FormBuilder,
    private sharedService: SharedService,
  ) {
    this.messageForm = this.fb.group({
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.chatService.receiveMessages().subscribe((data) => {
      if (data) {
        this.Messages.push(data);
        this.updateStatus();
        this.scrollToBottom();
      }
    });

    // this.chatService.chatActiveStatus().subscribe((data) => {
    //   console.log(this.userChatActive, 'user active');
    //   console.log(this.trainerChatActive, 'trainer active');
    //   console.log(data);
    //     this.userChatActive = data.userOnline;
    //     this.trainerChatActive = data.trainerOnline;
    //     console.log(
    //       this.trainerChatActive,
    //       'trainer',
    //       this.userChatActive,
    //       'user active'
    //     );
    // });

    this.chatService.chatActiveStatus().subscribe((data) => {
      console.log(data, 'active status data');
      this.userChatActive = data.userOnline;
      this.trainerChatActive = data.trainerOnline;
      console.log(this.trainerChatActive, 'trainer', this.userChatActive, 'user');
    });

    this.chatService.receiveUpdates().subscribe((data) => {
      if (data) {
        this.Messages = data;

        this.scrollToBottom();
      }
    });

    this.chatService.receiveTyping().subscribe((data) => {
      if (data) {
        console.log(data, 'tuping');
        if (data.role === 'user') {
          this.userTyping = data.typing;
        } else {
          this.trainerTyping = data.typing;
        }
      }
    });
  }

  ngOnChanges(): void {
    if (this.roomData) {
      this.UserId = this.roomData.UserId;
      this.TrainerId = this.roomData.TrainerId;
      this.dataLoaded = true;
      this.RoomId = this.roomData._id;

      if (this.currentRoomId && this.currentRoomId !== this.RoomId) {
        this.chatService.leaveRoom(this.currentRoomId, this.role);
        this.chatService.chatActiveUpdation(this.RoomId, this.role);
      }

      // joining the room and loading previous messages
      this.chatService
        .joinRoom(this.UserId, this.TrainerId, this.role)
        .subscribe((messages) => {
          this.Messages = messages;
          this.scrollToBottom();
          this.updateStatus();
          this.chatService.chatActiveUpdation(this.RoomId, this.role);
        });

      this.currentRoomId = this.roomData._id;
    }
  }

  // send messages with role based execution
  sendMessage() {
    let senderId;
    let readStatus:boolean = false
    if (this.role === 'user') {
      senderId = this.UserId;
    } else {
      senderId = this.TrainerId;
    }

    if(this.userChatActive && this.trainerChatActive){
      readStatus = true
    }

    if (this.messageForm.valid) {
      const message = this.messageForm.value.message;
      this.chatService.sendMessage(this.RoomId, message, senderId, readStatus);
      this.messageForm.reset();
    }
    this.scrollToBottom();
  }

  updateStatus() {
    let senderId: string = '';
    if (this.role === 'user') {
      senderId = this.TrainerId;
    } else if (this.role === 'trainer') {
      senderId = this.UserId;
    }
    this.chatService.updateStatus(this.RoomId, senderId);
  }

  typingIndicate(data: any) {
    console.log(data.message, 'mesa');
    if (data !== '') {
      this.chatService.onTyping(this.RoomId, this.role);
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(() => {
        this.chatService.stopTyping(this.RoomId, this.role);
      }, 1500);
    } else {
      this.chatService.stopTyping(this.RoomId, this.role);
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

  ngOnDestroy(): void {
    if (this.currentRoomId) {
      console.log(this.currentRoomId, 'id', this.role, 'dagnjmm');

      this.chatService.leaveRoom(this.currentRoomId, this.role);
      this.chatService.chatActiveUpdation(this.RoomId, this.role);
    } else {
      console.log('current id is not present');
      this.sharedService.showAlert('not left room');
    }
  }
}
