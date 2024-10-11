import { state } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.scss'],
})
export class PackageDetailsComponent {
  userLogged: boolean = false;
  loggedIn: Boolean = true;
  packageData: any;
  price: number = 0;
  constructor(private router: Router, private authService:AuthService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras) {
      this.packageData = navigation.extras.state?.['data'];
      this.price = this.packageData.Subscription.Price;
    }
  }

  subscribtion() {
    this.router.navigate(['/subscription'], {
      queryParams: { id: this.packageData._id },
    });
  }

  loginCheck(){
    if(this.authService.isUser()){
      this.userLogged = true
    }else{
      this.userLogged = false
    }
  }

  scrollRight() {
    const container = document.querySelector('.exercise')!;
    container.scrollBy({ left: 200, behavior: 'smooth' });
  }
  
  scrollLeft() {
    const container = document.querySelector('.exercise')!;
    container.scrollBy({ left: -200, behavior: 'smooth' });
  }

}
