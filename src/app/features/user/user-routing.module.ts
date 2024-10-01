import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackagesComponent } from './packages/packages.component';
import { userAuthGuard } from 'src/app/core/guards/authguard';
import { PackageDetailsComponent } from './packages/package-details/package-details.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { ChatComponent } from './chat/chat.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PaymentComponent } from './subscription/payment/payment.component';


const routes: Routes = [
  {path:'packages', component:PackagesComponent},
  {path:'packagedetails', component:PackageDetailsComponent},
  {path:'subscription', component:SubscriptionComponent},
  {path:'chat', component:ChatComponent, canActivate:[userAuthGuard]},
  {path:'userprofile', component:UserProfileComponent, canActivate:[userAuthGuard]},
  {path:'payment', component:PaymentComponent, canActivate:[userAuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
   