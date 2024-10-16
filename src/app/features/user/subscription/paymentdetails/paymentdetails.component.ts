import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paymentdetails',
  templateUrl: './paymentdetails.component.html',
  styleUrls: ['./paymentdetails.component.scss']
})
export class PaymentdetailsComponent {

  paymentDetails:any

  constructor(private router:Router){
    const navigation = this.router.getCurrentNavigation()
    // console.log('hello', navigation);
    
    if(navigation?.extras.state){
      // console.log(navigation?.extras?.state);
      
      this.paymentDetails = navigation?.extras?.state['data']
      console.log(this.paymentDetails, 'hello2');
      
    }
  }
}
