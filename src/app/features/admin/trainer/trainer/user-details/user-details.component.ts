import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerService } from '../../services/trainer.service';
import { serverResponse } from 'src/app/shared/interfaces/response.interface';
import { MatDialog } from '@angular/material/dialog';
import { UserDietUpdationComponent } from '../../user-diet-updation/user-diet-updation.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
user:any
userId:any

constructor(private router:Router, private service:TrainerService, private dialog:MatDialog){
  const navigation = this.router.getCurrentNavigation()
  if(navigation?.extras.state){
    this.userId = navigation.extras.state?.['id']
    console.log(this.userId, 'id');
    
  }
}

ngOnInit(): void {
  const userRole = 'user'
  this.service.getTrainerById(this.userId, userRole).subscribe({
    next:(res:serverResponse)=>{
      console.log(res);
      this.user = res.user
    }
  })
}

openDietDialog(): void {
  const dialogRef = this.dialog.open(UserDietUpdationComponent, {
    width: '300px',
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // console.log('Form data:', result);
      this.updateUserDiet(result)
    }
  });
}

updateUserDiet(data:any){
data.UserId = this.userId
data.item = 'diet'
console.log(data, 'data pro');

if(!this.user.Diet){
  this.service.insertNewDiet(data).subscribe({
    next:(res:serverResponse)=>{
      console.log(res);
      if(res.success){
        this.router.navigate(['/trainerdashboard'])
      }
    },
  })
}else{
  data.id = this.user.Diet._id
  this.service.updateDiet(data).subscribe({
    next:(res:serverResponse)=>{
      console.log(res);
      if(res.success){
        this.router.navigate(['/trainerdashboard'])
      }
    },
  })
}
}
}
