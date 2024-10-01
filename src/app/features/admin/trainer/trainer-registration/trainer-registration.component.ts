import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { serverResponse } from 'src/app/shared/interfaces/response.interface';
import { Router } from '@angular/router';
import { TrainerService } from '../services/trainer.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-trainer-registration',
  templateUrl: './trainer-registration.component.html',
  styleUrls: ['./trainer-registration.component.scss'],
})
export class TrainerRegistrationComponent {
  admin: Boolean = true;
  loggedIn: Boolean = false;

  constructor(private service: TrainerService, private router:Router, private sharedService:SharedService) {}

  receiveRegisterData(data: any) {
    console.log(data, 'trainer data');
    this.service.trainerRegistration(data).subscribe({
      next: (res: serverResponse) => {
        console.log(res);
        if(res.success){
          this.sharedService.showAlert("Registration successfull, Please verify your mail, mail has been sent to your email")
          setTimeout(()=>{
            this.router.navigate(['/admin'])
          },3000)
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
