import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent {

  constructor(private service:UserService, private router:Router){}

  getRegistrationData(data:object){
    console.log(data);
    this.service.userRegister(data).subscribe((res:any)=>{
      console.log(res);
      if(res.success){
        setTimeout(() => {
          this.router.navigate(['/login'])
        }, 500);
      }
    })
  }

}
