import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from 'src/app/core/services/auth.service';

declare const Razorpay:any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  userLogged: boolean = true;
  loggedIn: Boolean = true;
  paymentData: any = {}
  userId:string = ''


  constructor(private router:Router, private service:UserService, private authService:AuthService){
    const naviagation = this.router.getCurrentNavigation()
    if(naviagation?.extras){
      this.paymentData = naviagation.extras.state?.['data']
      console.log(this.paymentData, 'pey in');
    }
  this.userId = authService.getUserIdFromToken('user')!
  }

initiatePayment(amount:number){
  this.service.payment(amount).subscribe((order:any) => {
    console.log(order, 'log');
    
    const options = {
      key: environment.razorpayConfig.razorpayKey,  
      amount: order.items.amount,  
      currency: order.items.currency,
      name: 'Fitzee',
      description: 'Test Transaction',
      order_id: order.items.id,  
      handler: (response: any) => {
        console.log('Payment success:', response);
        // payment verification
        this.verifyPayment(response);
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
  });
}

verifyPayment(response: any) {
  response.userId = this.userId
  response.subscriptionId = this.paymentData._id
  response.packageId = this.paymentData.packageId
  this.service.paymentVerification(response).subscribe({
    next:(res:any)=>{
      console.log(res);
      
    },
    error:(error)=>{
      console.log(error);
      
    }
  })
  console.log('Verifying payment', response);
  
}

}
