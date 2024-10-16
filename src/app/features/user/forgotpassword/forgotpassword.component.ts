import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { serverResponse } from 'src/app/shared/interfaces/response.interface';
import { error, log } from 'console';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {
  forgotPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private service:UserService, private sharedService:SharedService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submit() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.get('email')?.value;
      const data = {
        email:email
      }
      this.service.forgotPassword(data).subscribe({
        next:(res:serverResponse)=>{
          console.log(res);
          if(res.success){
            this.sharedService.showAlert(res.message)
          }
        },
        error:(error)=>{
          console.log(error);
          this.sharedService.showAlert(error.error.message)
        }
      })
    }
  }
}
