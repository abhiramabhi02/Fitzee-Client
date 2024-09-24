import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-room-modal',
  templateUrl: './create-room-modal.component.html',
  styleUrls: ['./create-room-modal.component.scss'],
})
export class CreateRoomModalComponent {
  allUsers: any = [];
  selectedUserId: string | null = null

  constructor(
    public dialogRef: MatDialogRef<CreateRoomModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.allUsers = data.users
  }

  createRoom(){
    if(this.selectedUserId){
      this.dialogRef.close(this.selectedUserId)
    }
  }

  cancel(){
    this.dialogRef.close(null)
  }
}
