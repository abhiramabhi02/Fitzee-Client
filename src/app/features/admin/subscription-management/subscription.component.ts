import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { serverResponse } from 'src/app/shared/interfaces/response.interface';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  isAdmin: Boolean = true;
  isLoggedIn: Boolean = true;
  headers: string[] = [];
  keynames: string[] = [];
  Data: any[] = [];
  user: Boolean = false;
  newItemurl:string = '/addsubscription'
  editItemUrl:string = '/editsubscription'
  item:string = 'subscription'
  itemCount: number = 0

  constructor(private service:AdminService){}

  ngOnInit(): void {
    this.service.getAllItems(this.item, 1).subscribe({
      next:(res:serverResponse)=>{
        const result = this.service.subscriptionSorting(res)
        this.keynames = result.keys;
        this.headers = result.keys;
        this.Data = result.items;
        this.itemCount = res.itemCount
      },
      error:(err)=> {
        console.log(err);
        
      },
    })
  }

  statusUpdate(data:any){
    data.item = 'subscription'
    this.service.editItems(data).subscribe({
      next:(res:serverResponse)=>{
        console.log(res);
      }
    })
  }

  operationTrigger(data:any){
    console.log(data);
    const deleteData = {
      id:data.id,
      item:'subscription'
    }
    if(data.call === 'delete'){
      console.log('delete');
      this.service.deleteItems(deleteData).subscribe((res:any)=>{
        console.log(res)
        if(res.success){
          this.Data = this.Data.filter(item => item.id !== data.id)
        }
      })
      
    }
  }

  fetchDataPageNo(pageNo:number){
    console.log(pageNo, 'pgno');
    this.service.getAllItems(this.item, pageNo).subscribe({
      next:(res:serverResponse)=>{
        const result = this.service.subscriptionSorting(res)
        this.keynames = result.keys;
        this.headers = result.keys;
        this.Data = result.items;
        this.itemCount = res.itemCount
      }
    })
  }
  
}
