import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn, selectUserData } from '../../store/user.selectors';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdatePersonalDetailsComponent } from '../update-personal-details/update-personal-details.component';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { serverResponse } from 'src/app/shared/interfaces/response.interface';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
})
export class ProfileInfoComponent implements OnInit, OnChanges {
  @Input() userData: any = {};
  hasPersonalDetails:boolean = false
  hasImage:boolean = false
  hasPackage:boolean = false
  hasDiet:boolean = false
  hasSubscription:boolean = false

  constructor(private service: UserService, private dialog: MatDialog, private fireService:FirebaseService) {}

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.userData?.PersonalDetails){
      this.hasPersonalDetails = true

      if(this.userData.PersonalDetails.Image){
        this.hasImage = true
      }else{
        this.hasImage = false
      }
    }else{
      this.hasPersonalDetails = false
    }

    if(this.userData.Package){
      this.hasPackage = true
    }else{
      this.hasPackage = false
    }
    
    if(this.userData.Diet){
      this.hasDiet = true
    }else{
      this.hasDiet = false
    }

    if(this.userData.Subscription){
      this.hasSubscription = true
    }else{
      this.hasSubscription = false
    }
  }

  openUpdateUserDialog(): void {
    const personalDetails = this.userData.PersonalDetails || {
      Image: null,
      Age: null,
      Gender: '',
      Height: null,
      Weight: null,
    };
    const dialogRef = this.dialog.open(UpdatePersonalDetailsComponent, {
      width: '400px',
      data: {
        Image: personalDetails.Image || '',
        Age: personalDetails.Age || '',
        Gender: personalDetails.Gender || '',
        Height: personalDetails.Height || '',
        Weight: personalDetails.Weight || '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // console.log(result, 'data');
        this.updatePersonalData(result)
      }
    });
  }

  async updatePersonalData(data:any){
    let downloadUrl
    if(data.age){
      data.age = this.dateConverter(data.age)
    }
    if(data.image){
      downloadUrl = await this.fireService.uploadNewsImages(data.image)
      data.image = downloadUrl
    }
    data.id = this.userData._id
    console.log(data);
    this.service.profileUpdation(data).subscribe({
      next:(res:serverResponse)=>{
        console.log(res);
      }
    })
    
  }

  dateConverter(age: any) {
    const date = new Date(age);
    const formattedDate = date.toLocaleDateString('en-CA');
    console.log(formattedDate);
    return formattedDate
    
  }
}
