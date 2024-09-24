import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HeaderComponent } from './utils/header/header.component';
import { LoginComponent } from './Forms/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './Forms/registration/registration.component';
import { RouterModule } from '@angular/router';
import { DataTableComponent } from './utils/data-table/data-table.component';
import { SerialNumberPipe } from './pipes/serial-number.pipe';
import { AddItemComponent } from './Forms/add-item/add-item.component';
import { EditItemComponent } from './Forms/edit-item/edit-item.component';
import { FooterComponent } from './utils/footer/footer.component';
import { PackageFormComponent } from './Forms/package-form/package-form.component';
import { TextTrimPipe } from './pipes/text-trim.pipe';
import { PackageEditComponent } from './Forms/package-edit/package-edit.component';
import { SharedService } from './services/shared.service';
import { ChatRoomsComponent } from './utils/chat-rooms/chat-rooms.component';
import { ChatSpaceComponent } from './utils/chat-space/chat-space.component';
import { CreateRoomModalComponent } from './utils/create-room-modal/create-room-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TimeStampPipe } from './pipes/time-stamp.pipe'

@NgModule({
  declarations: [
    HeaderComponent,
    LoginComponent,
    RegistrationComponent,
    DataTableComponent,
    SerialNumberPipe,
    AddItemComponent,
    EditItemComponent,
    FooterComponent,
    PackageFormComponent,
    TextTrimPipe,
    PackageEditComponent,
    ChatRoomsComponent,
    ChatSpaceComponent,
    CreateRoomModalComponent,
    TimeStampPipe,
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  exports: [
    HeaderComponent,
    LoginComponent,
    RegistrationComponent,
    DataTableComponent,
    AddItemComponent,
    EditItemComponent,
    FooterComponent,
    PackageFormComponent,
    TextTrimPipe,
    PackageEditComponent,
    ChatRoomsComponent,
    ChatSpaceComponent,
    TimeStampPipe
  ],
})
export class SharedModule {}
