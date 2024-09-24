import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { serverResponse } from 'src/app/shared/interfaces/response.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-subscription',
  templateUrl: './add-subscription.component.html',
  styleUrls: ['./add-subscription.component.scss'],
})
export class AddSubscriptionComponent implements OnInit {
  isAdmin: Boolean = true;
  isLoggedIn: Boolean = true;
  subscriptionForm!: FormGroup;

  Features: string[] = [];

  constructor(private service: AdminService, private router:Router) {}

  ngOnInit(): void {
    this.createform();
  }

  createform() {
    this.subscriptionForm = this.service.createSubscriptionForm('new');
  }

  addFeatures(data: string, field: HTMLInputElement): void {
    if (data && data.trim().length > 0) {
      this.Features.push(data.trim());
      field.value = '';
    }
  }

  deselectFeature(data: string) {
    console.log(data);
    this.Features = this.Features.filter((item) => item !== data);
  }

  submit() {
    const data = this.subscriptionForm.value
    data.features = this.Features
    data.item = 'subscription'
    console.log(data);
    this.service.insertItems(data).subscribe({
      next:(res:serverResponse)=>{
        console.log(res);
        if(res.success){
          this.router.navigate(['/subscriptionmanagement'])
        }
      },
      error:(err)=> {
        console.log(err);
        
      },
    })
  }
}
