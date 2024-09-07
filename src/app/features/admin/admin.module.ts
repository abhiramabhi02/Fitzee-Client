import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { AdminLoginComponent } from './admin-login/admin-login.component';
import { TrainerRegistrationComponent } from './trainer-registration/trainer-registration.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ExerciseManagementComponent } from './exercise-management/exercise-management.component';
import { NewsManagementComponent } from './news-management/news-management.component';
import { AddNewsComponent } from './news-management/add-news/add-news.component';
import { EditNewsComponent } from './news-management/edit-news/edit-news.component';


@NgModule({
  declarations: [
    AdminLoginComponent,
    TrainerRegistrationComponent,
    AdminDashboardComponent,
    UserManagementComponent,
    ExerciseManagementComponent,
    NewsManagementComponent,
    AddNewsComponent,
    EditNewsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
