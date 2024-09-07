import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './features/user/user-home/user-home.component';
import { AdminLoginComponent } from './features/admin/admin-login/admin-login.component';
import { loginAuthGuard } from './core/guards/authguard';

const routes: Routes = [
  {path:'', component:UserHomeComponent},
  {path:'admin', component:AdminLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
