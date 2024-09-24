import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin/services/admin.service';
import { serverResponse } from 'src/app/shared/interfaces/response.interface';
import { UserService } from '../services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { state } from '@angular/animations';

export interface PackageInterface {
  _id: string;
  Packagename: string;
  Description: string;
  Exercises: exerciseInterface[];
  Subscription: SubscriptionInterface;
}
interface exerciseInterface {
  _id: string;
  Name: string;
  Description: string;
  Image: string;
}
interface SubscriptionInterface {
  _id: string;
  Name: String;
  Features: Array<string>;
  Price: Object;
}

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss'],
})
export class PackagesComponent implements OnInit {
  userLogged: boolean = false;
  loggedIn: Boolean = true;
  packagesData: any[] = [];

  constructor(
    private service: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const item = 'package';
    this.service.getItems(item).subscribe((res: serverResponse) => {
      console.log(res);
      if (res.success) {
        this.packagesData = res.items;
      }
    });
    this.loginCheck();
  }

  viewMore(id: string) {
    const data = this.packagesData.filter((item) => item._id === id)[0];
    this.router.navigate(['/packagedetails'], { state: { data } });
  }

  loginCheck() {
    if (this.authService.isUser()) {
      this.userLogged = true;
    } else {
      this.userLogged = false;
    }
  }
}
