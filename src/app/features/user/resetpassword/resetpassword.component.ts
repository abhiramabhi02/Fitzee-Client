import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { noSpacesValidator } from 'src/app/shared/validators/custom-validators';
import { UserService } from '../services/user.service';
import { serverResponse } from 'src/app/shared/interfaces/response.interface';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
})
export class ResetpasswordComponent {
  userEmail!: string | null;

  resetPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private service: UserService,
    private router: Router,
    private sharedService: SharedService
  ) {
    this.userEmail = this.activatedRoute.snapshot.paramMap.get('email');
    console.log(this.userEmail, 'use');

    this.resetPasswordForm = this.fb.group({
      password: [
        '',
        [Validators.required, Validators.minLength(6), noSpacesValidator()],
      ],
    });
  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      console.log(this.resetPasswordForm.value);
      const data = {
        email: this.userEmail,
        password: this.resetPasswordForm.value.password,
      };

      this.service.resetPassword(data).subscribe({
        next: (res: serverResponse) => {
          console.log(res);
          if (res.success) {
            this.sharedService.showAlert(res.message)
            setTimeout(() => {
              
              this.router.navigate(['/login']);
            }, 2000);
          }
        },
        error:(error)=>{
          this.sharedService.showAlert(error.error.message)
        }
      });
    }
  }
}
