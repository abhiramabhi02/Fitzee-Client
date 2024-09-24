import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TrainerRegistrationComponent} from './trainer-registration/trainer-registration.component'
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ExerciseManagementComponent } from './exercise-management/exercise-management.component';
import { NewsManagementComponent } from './news-management/news-management.component';
import { adminAuthGuard, trainerAuthGuard } from 'src/app/core/guards/authguard';
import { AddNewsComponent } from './news-management/add-news/add-news.component';
import { EditNewsComponent } from './news-management/edit-news/edit-news.component';
import { AddExerciseComponent } from './exercise-management/add-exercise/add-exercise.component';
import { EditExerciseComponent } from './exercise-management/edit-exercise/edit-exercise.component';
import { PackagesManagementComponent } from './packages-management/packages-management.component';
import { AddPackageComponent } from './packages-management/add-package/add-package.component';
import { EditPackageComponent } from './packages-management/edit-package/edit-package.component';
import { SubscriptionComponent } from './subscription-management/subscription.component';
import { AddSubscriptionComponent } from './subscription-management/add-subscription/add-subscription.component';
import { EditSubscriptionComponent } from './subscription-management/edit-subscription/edit-subscription.component';
import { TrainerComponent } from './trainer/trainer.component';
import { TrainerChatComponent } from './trainer-chat/trainer-chat.component';


const routes: Routes = [
  {path:'trainer', component:TrainerRegistrationComponent},
  {path:'admindashboard', component:AdminDashboardComponent, canActivate:[adminAuthGuard]},
  {path:'usermanagement', component:UserManagementComponent, canActivate:[adminAuthGuard]},
  {path:'exercisemanagement', component:ExerciseManagementComponent, canActivate:[adminAuthGuard]},
  {path:'newsmanagement', component:NewsManagementComponent, canActivate:[adminAuthGuard]},
  {path:'addnews', component:AddNewsComponent, canActivate:[adminAuthGuard]},
  {path:'packagemanagement', component:PackagesManagementComponent, canActivate:[adminAuthGuard]},
  {path:'editnews', component:EditNewsComponent, canActivate:[adminAuthGuard]},
  {path:'addexercise', component:AddExerciseComponent, canActivate:[adminAuthGuard]},
  {path:'editexercise', component:EditExerciseComponent, canActivate:[adminAuthGuard]},
  {path:'addpackage', component:AddPackageComponent, canActivate:[adminAuthGuard]},
  {path:'editpackage', component:EditPackageComponent, canActivate:[adminAuthGuard]},
  {path:'subscriptionmanagement', component:SubscriptionComponent, canActivate:[adminAuthGuard]},
  {path:'addsubscription', component:AddSubscriptionComponent, canActivate:[adminAuthGuard]},
  {path:'editsubscription', component:EditSubscriptionComponent, canActivate:[adminAuthGuard]},
  {path:'trainerdashboard', component:TrainerComponent, canActivate:[trainerAuthGuard]},
  {path:'trainerchat', component:TrainerChatComponent, canActivate:[trainerAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
