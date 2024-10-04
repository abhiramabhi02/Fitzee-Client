import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { userReducer } from './store/user.reducer';

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
import { PaymentComponent } from './subscription/payment/payment.component';
import { UpdatePersonalDetailsComponent } from './user-profile/update-personal-details/update-personal-details.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ChatBotComponent } from './chat-bot/chat-bot.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';


// export function localStorageSyncReducer(reducer: any): any {
//   return localStorageSync({
//     keys: {
//       users: ['users', 'loggedIn'], // This is correct
//     }, // Ensure this matches your state structure
//     rehydrate: true,
//   })(reducer);
// }

// const metaReducers: MetaReducer<any>[] = [localStorageSyncReducer];

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
    PaymentComponent,
    UpdatePersonalDetailsComponent,
    ChatBotComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('users', userReducer,)
  ],
})
export class UserModule {}
