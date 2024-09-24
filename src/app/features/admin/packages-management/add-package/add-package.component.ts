import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/features/user/services/user.service';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { serverResponse } from 'src/app/shared/interfaces/response.interface';


@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.scss']
})
export class AddPackageComponent implements OnInit {

  exercises:object[] = []
  subscriptions:object[] = []

  constructor(private service:AdminService, private router:Router){}

  ngOnInit(): void {
   this.getExercises()
   this.getSubscriptions()
  }

  getExercises(){
    this.service.getAllItems('exercise').subscribe((res:serverResponse)=>{
      if(res.success){
        this.exercises = res.items
        // console.log(this.exercises);
        
      }
    })
  }

  getSubscriptions(){  
    this.service.getAllItems('subscription').subscribe((res:serverResponse)=>{
      if(res.success){
        this.subscriptions = res.items
        // console.log(this.subscriptions);
        
      }
    })
  }

  receiveFormData(data:any){
    const packageData = {item:'package', ...data}
    this.service.insertItems(packageData).subscribe((res:serverResponse)=>{
      console.log(res);
      if(res.success){
        setTimeout(() => {
          this.router.navigate(['/packagemanagement'])
        }, 1000);
      }
      
    })
  }
}
