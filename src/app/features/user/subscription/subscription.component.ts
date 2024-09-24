import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { serverResponse } from 'src/app/shared/interfaces/response.interface';

interface subscription{
  _id:string;
  Name:string;
  Features:string[];
  Prices:Prices;
}

interface Prices{
  monthly:number;
  quarterly:number;
  yearly:number
}

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  userLogged: boolean = false;
  loggedIn: Boolean = true;
  subscriptionData!:any;
  Features: string[] = []
  constructor(private router:Router, private service:UserService){
  }

  ngOnInit(): void {
    const item = 'subscription'
    this.service.getItems(item).subscribe({
      next:(res:serverResponse) => {
        if(res.success){
          this.subscriptionData = res.items
          console.log(this.subscriptionData);
          
        }
      },
    })
  }

}

