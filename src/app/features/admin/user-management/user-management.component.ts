import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  isAdmin: Boolean = true;
  isLoggedIn: Boolean = true;
  headers: string[] = [];
  keynames: string[] = [];
  Data: any[] = [];
  user: Boolean = true

  constructor(private service:AdminService){}

  ngOnInit(): void {
    const item:string = 'user'
    this.service.getAllItems(item).subscribe((res:any)=>{
      const result = this.service.usersSorting(res)
      this.keynames = result.keys
      this.headers = result.keys
      this.Data = result.items
    })
  }
}
