import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class userAuthGuard {
  constructor(private authService: AuthService, private router: Router, private sharedService:SharedService) {}

  canActivate(): Boolean {
    if (this.authService.isUser()) {
      return true;
    } else {
      this.router.navigate(['']);
      this.sharedService.showAlert('session expired, please login')
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class trainerAuthGuard {
  constructor(private authService: AuthService, private router: Router , private sharedService:SharedService) {}

  canActivate(): Boolean {
    if (this.authService.isTrainer()) {
      return true;
    } else {
      this.sharedService.showAlert('session expired, please login')
      this.router.navigate(['/admin']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class adminAuthGuard {
  constructor(private authService: AuthService, private router: Router, private sharedService:SharedService) {}

  canActivate(): Boolean {
    if (this.authService.isAdmin()) {
      return true;
    } else {
      this.sharedService.showAlert('session expired, please login')
      this.router.navigate(['/admin']);
      return false;
    }
  }

}


