import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.scss']
})
export class EditNewsComponent {
  downloadUrl:string = ''

  constructor(private service:AdminService, private firebaseService:FirebaseService){}

  async recieveEditData(data:{id:string, name:string, description:string, image:File|null}){
    console.log(data);
    let updatedData
    if(data.image){
      console.log(data.image);
      try {
        const imageUrl = await this.firebaseService.uploadNewsImages(data.image)
        this.downloadUrl = imageUrl

         updatedData = {
          item: 'news',
          id:data.id,
          Title: data.name,
          Description: data.description,
          Image: this.downloadUrl
        }
        this.service.editItems(updatedData).subscribe((res:any)=>{
          console.log(res);
          
        })
      } catch (error) {
        console.log(error);
        
      }
    }else{
      updatedData = {
        item:'news',
        id:data.id,
        Title:data.name,
        Description:data.description
      }
      this.service.editItems(updatedData).subscribe((res:any)=>{
        console.log(res);
        
      })
    }
  }
}
