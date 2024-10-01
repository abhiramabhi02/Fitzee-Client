import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { serverResponse } from 'src/app/shared/interfaces/response.interface';
import { TrainerService } from '../trainer/services/trainer.service';
import { state } from '@angular/animations';

export interface LoginResponse {
  token: string;
  success: Boolean;
  user: Object;
  message: string;
}

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent {
  admin: Boolean = true;
  loggedIn: Boolean = false;
  loginData!: Object;
  adminData!:Object
  trainerData!:object

  constructor(private service: AdminService, private trainerService:TrainerService, private authService:AuthService, private router:Router) {}

  getFormData(data: any) {
    this.loginData = data;
    if(!data.trainer){
      this.service.adminLogin(data).subscribe((response:any) => {
        this.adminData = response.user
        const token = response.token
        this.authService.setToken(token, 'admin')
        this.dashboardLogin()
      });
    }else{
      this.trainerService.trainerLogin(data).subscribe({
        next:(res:serverResponse)=>{
          console.log(res);
          
          this.trainerData = res.user
          const token = res.token
          this.authService.setToken(token, 'trainer')
          this.trainerDashboard()
        }
      })
    }
  }

  dashboardLogin(){
    if(this.authService.isAdmin()){
      this.router.navigate(['/admindashboard'])
    }else{
      this.router.navigate(['/admin'])
    }
  }

  trainerDashboard(){
    if(this.authService.isTrainer()){
      this.router.navigate(['/trainerdashboard'], { state: { data:this.trainerData } });
    }else{
      this.router.navigate(['/admin'])
    }
  }
}
