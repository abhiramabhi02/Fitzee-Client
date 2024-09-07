import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TrainerRegistrationComponent} from './trainer-registration/trainer-registration.component'
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ExerciseManagementComponent } from './exercise-management/exercise-management.component';
import { NewsManagementComponent } from './news-management/news-management.component';
import { adminAuthGuard } from 'src/app/core/guards/authguard';
import { AddNewsComponent } from './news-management/add-news/add-news.component';
import { EditNewsComponent } from './news-management/edit-news/edit-news.component';


const routes: Routes = [
  {path:'trainer', component:TrainerRegistrationComponent},
  {path:'admindashboard', component:AdminDashboardComponent, canActivate:[adminAuthGuard]},
  {path:'usermanagement', component:UserManagementComponent, canActivate:[adminAuthGuard]},
  {path:'exercisemanagement', component:ExerciseManagementComponent, canActivate:[adminAuthGuard]},
  {path:'newsmanagement', component:NewsManagementComponent, canActivate:[adminAuthGuard]},
  {path:'addnews', component:AddNewsComponent, canActivate:[adminAuthGuard]},
  {path:'editnews', component:EditNewsComponent, canActivate:[adminAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
