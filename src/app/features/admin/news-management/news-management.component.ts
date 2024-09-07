import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

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

  constructor(private service: AdminService, private router:Router) {}

  ngOnInit(): void {
    this.service.getAllNews().subscribe((res: any) => {
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
      this.service.deleteNews(deleteData).subscribe((res)=>{
        console.log(res)
        this.Data = this.Data.filter(item => item.id !== data.id)
      })
      
    }else{ 
      throw new Error('invalid call')
    }
    
  }

}
