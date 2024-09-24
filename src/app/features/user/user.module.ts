import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { UserHomeComponent } from './user-home/user-home.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { PackagesComponent } from './packages/packages.component';
import { PackageDetailsComponent } from './packages/package-details/package-details.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProfileSidebarComponent } from './user-profile/profile-sidebar/profile-sidebar.component';
import { ProfileInfoComponent } from './user-profile/profile-info/profile-info.component';
import { ProfileUpdateComponent } from './user-profile/profile-update/profile-update.component';

@NgModule({
  declarations: [
    UserHomeComponent,
    UserLoginComponent,
    UserRegistrationComponent,
    PackagesComponent,
    PackageDetailsComponent,
    SubscriptionComponent,
    ChatComponent,
    UserProfileComponent,
    ProfileSidebarComponent,
    ProfileInfoComponent,
    ProfileUpdateComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    HttpClientModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class UserModule {}
