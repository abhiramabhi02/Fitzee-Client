import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-news-management',
  templateUrl: './news-management.component.html',
  styleUrls: ['./news-management.component.scss']
})
export class NewsManagementComponent implements OnInit {

  isAdmin: Boolean = true;
  isLoggedIn: Boolean = true;
  headers: string[] = [];
  keynames: string[] = [];
  Data: any[] = [];
  user: Boolean = false;
  newItemurl:string = '/addnews'
  editItemUrl:string = '/editnews'

  constructor(private service: AdminService, private router:Router, private firebaseService:FirebaseService) {}

  ngOnInit(): void {
    const item = 'news'
    this.service.getAllItems(item).subscribe((res: any) => {
      console.log(res.items, 'con');
      
      const result = this.service.newsSorting(res);
      this.keynames = result.keys;
      this.headers = result.keys;
      this.Data = result.items;
    });
  }

  operationTrigger(data:object | any){
    console.log(data);
    const deleteData = {
      id:data.id,
      item:'news'
    }
    if(data.call === 'edit'){
      console.log('edit');
      
    }else if(data.call === 'delete'){
      console.log('delete');
      this.service.deleteItems(deleteData).subscribe((res:any)=>{
        console.log(res)
        if(res.success){
          this.firebaseService.deleteImage(data.url)
          this.Data = this.Data.filter(item => item.id !== data.id)
        }
      })
      
    }else{ 
      throw new Error('invalid call')
    }
    
  }

}
