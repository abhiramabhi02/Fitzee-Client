import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChildFn,
  CanActivateFn,
  CanDeactivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class userAuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Boolean {
    if (this.authService.isUser()) {
      return true;
    } else {
      this.router.navigate(['/user']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class trainerAuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Boolean {
    if (this.authService.isTrainer()) {
      return true;
    } else {
      this.router.navigate(['/admin']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class adminAuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Boolean {
    if (this.authService.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['/admin']);
      return false;
    }
  }

}

@Injectable()
export class loginAuthGuard {

    constructor(private authService:AuthService, private router:Router){}

    canActivate(): Boolean | UrlTree {
        if(this.authService.isAdmin()){
            return this.router.createUrlTree(['/admindashboard'])
        }else{
            return true
        }
    }
}
