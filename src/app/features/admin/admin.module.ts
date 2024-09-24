import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';

import { AdminLoginComponent } from './admin-login/admin-login.component';
import { TrainerRegistrationComponent } from './trainer-registration/trainer-registration.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ExerciseManagementComponent } from './exercise-management/exercise-management.component';
import { NewsManagementComponent } from './news-management/news-management.component';
import { AddNewsComponent } from './news-management/add-news/add-news.component';
import { EditNewsComponent } from './news-management/edit-news/edit-news.component';
import { EditExerciseComponent } from './exercise-management/edit-exercise/edit-exercise.component';
import { AddExerciseComponent } from './exercise-management/add-exercise/add-exercise.component';
import { PackagesManagementComponent } from './packages-management/packages-management.component';
import { EditPackageComponent } from './packages-management/edit-package/edit-package.component';
import { AddPackageComponent } from './packages-management/add-package/add-package.component';
import { SubscriptionComponent } from './subscription-management/subscription.component';
import { TrainerComponent } from './trainer/trainer.component';
import { AddSubscriptionComponent } from './subscription-management/add-subscription/add-subscription.component';
import { EditSubscriptionComponent } from './subscription-management/edit-subscription/edit-subscription.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrainerChatComponent } from './trainer-chat/trainer-chat.component';


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
    EditExerciseComponent,
    AddExerciseComponent,
    PackagesManagementComponent,
    EditPackageComponent,
    AddPackageComponent,
    SubscriptionComponent,
    TrainerComponent,
    AddSubscriptionComponent,
    EditSubscriptionComponent,
    TrainerChatComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    NgApexchartsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
