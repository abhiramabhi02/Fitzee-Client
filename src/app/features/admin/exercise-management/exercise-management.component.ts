import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { serverResponse } from 'src/app/shared/interfaces/response.interface';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-exercise-management',
  templateUrl: './exercise-management.component.html',
  styleUrls: ['./exercise-management.component.scss'],
})
export class ExerciseManagementComponent implements OnInit {
  isAdmin: Boolean = true;
  isLoggedIn: Boolean = true;
  headers: string[] = [];
  keynames: string[] = [];
  Data: any[] = [];
  user: Boolean = false;
  newItemurl:string = '/addexercise'
  editItemUrl:string = '/editexercise'

  constructor(private service: AdminService, private firebaseService:FirebaseService, private sharedService:SharedService) {}

  ngOnInit(): void {
    const item:string = 'exercise'
    this.service.getAllItems(item).subscribe((res: any) => {
      const result = this.service.exerciseSorting(res);
      this.keynames = result.keys;
      this.headers = result.keys;
      this.Data = result.items;
    });
  }

  operationTrigger(data:object | any){
    const deleteData = {
      id:data.id,
      item:'exercise'
    }
   if(data.call === 'delete'){
      this.service.deleteItems(deleteData).subscribe({
        next:(res:any)=>{
          if(res.success){
            this.sharedService.showAlert(res.message)
            this.firebaseService.deleteImage(data.url)
            this.Data = this.Data.filter(item => item.id !== data.id)
          }
        }
      })
    }else{ 
      throw new Error('invalid call')
    }
    
  }
}
