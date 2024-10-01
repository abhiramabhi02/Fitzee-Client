import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { serverResponse } from 'src/app/shared/interfaces/response.interface';

@Component({
  selector: 'app-packages-management',
  templateUrl: './packages-management.component.html',
  styleUrls: ['./packages-management.component.scss'],
})
export class PackagesManagementComponent implements OnInit {
  isAdmin: Boolean = true;
  isLoggedIn: Boolean = true;
  headers: string[] = [];
  keynames: string[] = [];
  Data: any[] = [];
  user: Boolean = false;
  newItemurl: string = '/addpackage';
  editItemUrl: string = '/editpackage';

  constructor(
    private service: AdminService,
    private router: Router,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    const item = 'package';
    this.service.getAllItems(item).subscribe((res: any) => {
      console.log(res, 'res');

      const result = this.service.packageSorting(res);
      this.keynames = result.keys;
      this.headers = result.keys;
      this.Data = result.items;
    });
  }

  statusUpdate(data:any){
    data.item = 'package'
    this.service.editItems(data).subscribe({
      next:(res:serverResponse)=>{
        console.log(res);
        
      }
    })
  }

  operationTrigger(data: any) {
    console.log(data);
    const deleteData = {
      id: data.id,
      item: 'package',
    };
    if (data.call === 'delete') {
      console.log('delete');
      this.service.deleteItems(deleteData).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.Data = this.Data.filter((item) => item.id !== data.id);
          }
        },
      });
    }
  }
}
