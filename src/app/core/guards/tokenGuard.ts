import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class adminTokenGuard implements CanActivate {
  constructor(private router: Router, private authService:AuthService) {}

  canActivate(): boolean {
    if (this.authService.isAdmin()) {
      this.router.navigate(['/admindashboard']);
      return false; 
    }
    return true;
  }
}


@Injectable({
    providedIn: 'root',
  })
  export class userTokenGuard implements CanActivate {
    constructor(private router: Router, private authService:AuthService) {}
  
    canActivate(): boolean {
      if (this.authService.isUser()) {
        this.router.navigate(['']);
        return false; 
      }
      return true;
    }
  }

  
  @Injectable({
    providedIn: 'root',
  })
  export class trainerTokenGuard implements CanActivate {
    constructor(private router: Router, private authService:AuthService) {}
  
    canActivate(): boolean {
      if (this.authService.isTrainer()) {
        this.router.navigate(['/trainerdashboard']);
        return false; 
      }
      return true;
    }
  }
  