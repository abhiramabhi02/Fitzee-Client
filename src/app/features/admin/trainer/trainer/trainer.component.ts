import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { serverResponse } from 'src/app/shared/interfaces/response.interface';
import { ChatService } from 'src/app/shared/services/chat.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { ProfilePicUpdationComponent } from 'src/app/shared/utils/profile-pic-updation/profile-pic-updation.component';
import { TrainerService } from '../services/trainer.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserDietUpdationComponent } from '../user-diet-updation/user-diet-updation.component';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.scss'],
})
export class TrainerComponent implements OnInit {
  trainer: boolean = true;
  trainerData: any;
  userData: any;
  trainerId!:string

  constructor(
    private chatService: ChatService,
    private router: Router,
    private dialog: MatDialog,
    private fireService: FirebaseService,
    private service:TrainerService,
    private authService:AuthService
  ) {
    const id = this.authService.getUserIdFromToken('trainer')
    if(id) this.trainerId = id
  }

  ngOnInit(): void {
    const role = 'trainer';

    this.service.getTrainerById(this.trainerId, role).subscribe({
      next:(res:serverResponse)=>{
        console.log(res);
        this.trainerData = res.user
      },
      error:(error)=>{
        console.log(error);
        
      }
    })

    this.chatService.getRooms(this.trainerId, role).subscribe({
      next: (res: serverResponse) => {
        console.log(res);
        this.userData = res.items;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  openProfilePictureDialog() {
    const dialogRef = this.dialog.open(ProfilePicUpdationComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Profile picture updated with file:', result);
        this.updateProfilePic(result)
      }
    });
  }


  async updateProfilePic(data:File){
    const downloadUrl = await this.fireService.uploadNewsImages(data)
    console.log(downloadUrl, 'url');
    const updateData = {
      id:this.trainerData._id,
      item:'trainer',
      Image:downloadUrl
    }
    this.service.updateTrainerData(updateData).subscribe({
      next:(res:serverResponse)=>{
        console.log(res);
        
      },
      error:(error)=>{
        console.log(error);
        
      }
    })
    
  }

  userDetails(id:string){
    this.router.navigate(['/userdetails'], {state:{id}})
  }

  logout() {
    localStorage.removeItem('trainer');
    this.router.navigate(['/admin']);
  }
}
