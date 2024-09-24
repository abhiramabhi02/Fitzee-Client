import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './features/user/user-home/user-home.component';
import { AdminLoginComponent } from './features/admin/admin-login/admin-login.component';
import { UserLoginComponent } from './features/user/user-login/user-login.component';
import { UserRegistrationComponent } from './features/user/user-registration/user-registration.component';
import { adminTokenGuard, userTokenGuard } from './core/guards/tokenGuard';


const routes: Routes = [
  {path:'', component:UserHomeComponent},
  {path:'login', component:UserLoginComponent},
  {path:'register', component:UserRegistrationComponent},
  {path:'admin', component:AdminLoginComponent, canActivate:[adminTokenGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
