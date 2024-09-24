import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { serverResponse } from 'src/app/shared/interfaces/response.interface';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-edit-package',
  templateUrl: './edit-package.component.html',
  styleUrls: ['./edit-package.component.scss'],
})
export class EditPackageComponent {
  exercises: object[] = [];
  subscriptions: object[] = [];

  constructor(private service: AdminService, private router: Router, private sharedService:SharedService) {}

  ngOnInit(): void {
    this.getExercises();
    this.getSubscriptions();
  }

  getExercises() {
    this.service.getAllItems('exercise').subscribe({
      next:(res:serverResponse)=>{
        if (res.success) {
          this.exercises = res.items;
        }
      }
    });
  }

  getSubscriptions() {
    this.service.getAllItems('subscription').subscribe((res: serverResponse) => {
      if (res.success) {
        this.subscriptions = res.items;
      }
    });
  }

  receiveFormData(data: any) {
    const payLoad = {
      item: 'package',
      id: data.id,
      Packagename: data.name,
      Description: data.description,
      Exercises: data.exercises,
      Subscription: data.subscription,
    };
    this.service.editItems(payLoad).subscribe((res: serverResponse) => {
      console.log(res);
      if (res.success) {
        this.sharedService.showAlert(res.message)
        setTimeout(() => {
          this.router.navigate(['/packagemanagement']);
        }, 1000);
      }
    });
  }
}
