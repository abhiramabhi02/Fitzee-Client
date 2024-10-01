import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { serverResponse } from 'src/app/shared/interfaces/response.interface';

@Component({
  selector: 'app-edit-subscription',
  templateUrl: './edit-subscription.component.html',
  styleUrls: ['./edit-subscription.component.scss']
})
export class EditSubscriptionComponent implements OnInit {
  isAdmin: Boolean = true;
  isLoggedIn: Boolean = true;
  subscriptionEditForm!: FormGroup;
  subscriptionData:any 
  Features: string[] = [];

  constructor(private service: AdminService, private router:Router) {
    const navigation = router.getCurrentNavigation()
    if(navigation?.extras){
      this.subscriptionData = navigation.extras.state
      this.subscriptionData = this.subscriptionData.data[0]
      this.Features = this.subscriptionData.Features
    }
  }

  ngOnInit(): void {
    this.createform();
  }

  createform() {
    this.subscriptionEditForm = this.service.createSubscriptionForm(this.subscriptionData);
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
    const data = this.subscriptionEditForm.value
    const updatedData = {
      Name:data.name,
      Features: this.Features,
      Price:data.price,
      LastUpdate:Date.now(),
      id:this.subscriptionData.id,
      item:'subscription'
    }
    console.log(updatedData);
    this.service.editItems(updatedData).subscribe({
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
