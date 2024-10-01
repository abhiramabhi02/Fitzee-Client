import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { serverResponse } from 'src/app/shared/interfaces/response.interface';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  loggedIn: Boolean = true;
  userLogged: boolean = true;
  userData: any;
  package:string = 'package'

  constructor(private service: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    const role = 'user';
    const userId = this.authService.getUserIdFromToken(role);
    console.log(userId, 'id');
    if (userId) {
      this.service.getUserById(userId, role).subscribe({
        next: (response: serverResponse) => {
          console.log(response, 'res');
          
          this.userData = response.user;
          if(this.userData.Package){
            const data = {
              item:this.package,
              id:this.userData.Package._id
            }
            this.service.getItemsbyId(data).subscribe({
              next:(res:serverResponse)=>{
                if(res.success){
                  this.userData.Package = res.items
                } 
              }
            })
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
      console.log('hello word');
      
    }  
  
  }
}
