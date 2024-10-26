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
  item:string = 'exercise'
  itemCount: number = 0

  constructor(private service: AdminService, private firebaseService:FirebaseService, private sharedService:SharedService) {}

  ngOnInit(): void {
    this.service.getAllItems(this.item, 1).subscribe((res: any) => {
      const result = this.service.exerciseSorting(res);
      this.keynames = result.keys;
      this.headers = result.keys;
      this.Data = result.items;
      this.itemCount = res.itemCount
    });
  }

  statusUpdate(data:any){
    data.item = 'exercise'
    this.service.editItems(data).subscribe({
      next:(res:serverResponse)=>{
        console.log(res);
        
      }
    })
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

  fetchDataPageNo(pageNo:number){
    console.log(pageNo, 'pgno');
    this.service.getAllItems(this.item, pageNo).subscribe({
      next:(res:serverResponse)=>{
      const result = this.service.exerciseSorting(res)
      this.keynames = result.keys
      this.headers = result.keys
      this.Data = result.items
      this.itemCount = res.itemCount
      }
    })
  }
}
