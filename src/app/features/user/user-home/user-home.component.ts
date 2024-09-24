import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
  loggedIn:Boolean = true  
  userLogged: boolean = false
  newsData: any[] = []
  featuredNews:any = {}
  constructor(private service:UserService, private authService:AuthService){}

  ngOnInit(): void {
    const item = "news"
    this.loginCheck()
    this.service.getItems(item).subscribe((response:any)=>{
      // console.log(response);
     if(response.success){    
     const result =  this.service.newsSort(response.items)
     this.featuredNews = result.featured
     this.newsData = result.news     
     }
      
    })
  }

  loginCheck(){
    if(this.authService.isUser()){
      this.userLogged = true
    }else{
      this.userLogged = false
    }
  }
}  
