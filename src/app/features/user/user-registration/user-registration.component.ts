import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent {

  constructor(private service:UserService, private router:Router, private sharedService:SharedService){}

  getRegistrationData(data:object){
    console.log(data);
    this.service.userRegister(data).subscribe((res:any)=>{
      console.log(res);
      if(res.success){
        this.sharedService.showAlert("Registration successfull, Please verify your mail, mail has been sent to your email")
        setTimeout(() => {
          this.router.navigate(['/login'])
        }, 3000);
      }
    })
  }

}
