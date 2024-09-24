import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
})
export class ProfileInfoComponent {
  userData: any = {
    _id: 'newk348fr3oh',
    Name: 'Abhiram Vasudevan',
    Email: 'abhi@gmail.com',
    personalDetails: [{ Gender: 'Male', Age: 21, Height: 175, Weight: 48 }],
  };
}
