import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { serverResponse } from 'src/app/shared/interfaces/response.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Store } from '@ngrx/store';
import { loginUser } from '../store/user.actions';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent {
  userData!: object;
  errmessage: string = '';

  constructor(
    private service: UserService,
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedService,
    private store:Store
  ) {}

  getFormData(data: object) {
    console.log(data);
    this.service.userLogin(data).subscribe({
      next: (res: serverResponse) => {
        if (res.success) {
          this.store.dispatch(loginUser({user:res.user}))
          this.userData = res.user;
          const token = res.token;
          this.authService.setToken(token, 'user');
          this.userLogin();
        }
      },
      error: (err) => {
        console.log(err.error.message);
        this.errmessage = err.error.message;
        this.sharedService.showAlert(this.errmessage)
      },
    });
  }

  userLogin() {
    if (this.authService.isUser()) {
      console.log('true');

      this.router.navigate(['']);
    } else {
      console.log('false');

      this.router.navigate(['/login']);
    }
  }
}
