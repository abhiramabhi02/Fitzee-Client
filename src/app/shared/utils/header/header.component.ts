import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
@Input() isAdmin:Boolean = false
@Input() isLoggedIn:Boolean = true
@Input() user:boolean = true
@Input() trainer:boolean = false

constructor(private authService:AuthService, private router:Router){}

logOut(role:string){
console.log('log out called, ' ,role);

  this.authService.removeToken(role)
  if(role === 'user'){
    this.router.navigate(['/login'])
  }else if(role === 'admin' || role === 'trainer'){
    this.router.navigate(['/admin'])
  }
}

}
