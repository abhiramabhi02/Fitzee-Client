import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-exercise',
  templateUrl: './edit-exercise.component.html',
  styleUrls: ['./edit-exercise.component.scss']
})
export class EditExerciseComponent {
  downloadUrl:string = ''

  constructor(private service:AdminService, private firebaseService:FirebaseService, private router:Router){}

  async recieveEditData(data:{id:string, name:string, description:string, image:File|null}){
    console.log(data);
    let updatedData
    if(data.image){
      console.log(data.image);
      try {
        const imageUrl = await this.firebaseService.uploadNewsImages(data.image)
        this.downloadUrl = imageUrl

         updatedData = {
          item: 'exercise',
          id:data.id,
          Name: data.name,
          Description: data.description,
          Image: this.downloadUrl
        }
        this.service.editItems(updatedData).subscribe((res:any)=>{
          console.log(res);
          if(res.success){
            setTimeout(()=>{
              this.router.navigate(['/exercisemanagement'])
            },1000)
          }
          
        })
      } catch (error) {
        console.log(error);
        
      }
    }else{
      updatedData = {
        item:'exercise',
        id:data.id,
        Name:data.name,
        Description:data.description
      }
      this.service.editItems(updatedData).subscribe((res:any)=>{
        console.log(res);
        if(res.success){
          setTimeout(()=>{
            this.router.navigate(['/exercisemanagement'])
          },1000)
        }
        
      })
    }
  }
}
