import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent} from './header/header.component';
import { LoginComponent } from './login/login.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { RouterModule } from '@angular/router';
import { DataTableComponent } from './data-table/data-table.component';
import { SerialNumberPipe } from './pipes/serial-number.pipe';
import { AddItemComponent } from './add-item/add-item.component';
import { FirebaseService } from './services/firebase.service';
import { EditItemComponent } from './edit-item/edit-item.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LoginComponent,
    RegistrationComponent,
    DataTableComponent,
    SerialNumberPipe,
    AddItemComponent,
    EditItemComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    HeaderComponent,
    LoginComponent,
    RegistrationComponent,
    DataTableComponent,
    AddItemComponent,
    EditItemComponent
  ]
})
export class SharedModule { }
