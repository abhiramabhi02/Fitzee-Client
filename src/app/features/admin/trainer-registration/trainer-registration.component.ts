import { Component } from '@angular/core';

@Component({
  selector: 'app-trainer-registration',
  templateUrl: './trainer-registration.component.html',
  styleUrls: ['./trainer-registration.component.scss']
})
export class TrainerRegistrationComponent {
  admin: Boolean = true;
  loggedIn: Boolean = false;
}
