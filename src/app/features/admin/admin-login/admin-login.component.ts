import { Component, resolveForwardRef } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private service: AdminService, private authService:AuthService, private router:Router) {}

  getFormData(data: object) {
    this.loginData = data;
    this.service.adminLogin(data).subscribe((response:any) => {
      this.adminData = response.user
      const token = response.token
      this.authService.setToken(token, 'admin')
      this.dashboardLogin()
    });
  }

  dashboardLogin(){
    if(this.authService.isAdmin()){
      this.router.navigate(['/admindashboard'])
    }else{
      this.router.navigate(['/admin'])
    }
  }
}
