import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  noSpacesValidator,
  passwordValidator,
} from '../validators/custom-validators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {}

  // pop alert for certain opearaion handlings
  showAlert(
    message: string,
    action: string = 'close',
    duration: number = 3000
  ) {
    this.snackBar.open(message, action, {
      duration: duration,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  // creating login form for all the users
  createLoginForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email, noSpacesValidator()]],
      password: ['', [Validators.required, noSpacesValidator()]],
      trainer: [false],
    });
  }

  // creating registration form for all the users
  createRegisterForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, noSpacesValidator()]],
      email: ['', [Validators.required, Validators.email, noSpacesValidator()]],
      password: [
        '',
        [Validators.required, noSpacesValidator(), passwordValidator()],
      ],
      cpassword: [
        '',
        [Validators.required, noSpacesValidator(), passwordValidator()],
      ],
    });
  }

  // creating form for multiple particulars [exercise, news, etc..]
  createAddItemForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, noSpacesValidator()]],
      description: ['', [Validators.required, noSpacesValidator()]],
    });
  }

  // creating form for multiple particulars [exercise, news, etc..]
  createEditForm(data: Object | any): FormGroup {
    if (data.Name) {
      return this.fb.group({
        name: [data.Name, [Validators.required, noSpacesValidator()]],
        description: [
          data.Description,
          [Validators.required, noSpacesValidator()],
        ],
      });
    } else {
      return this.fb.group({
        name: [data.Title, [Validators.required, noSpacesValidator()]],
        description: [
          data.Description,
          [Validators.required, noSpacesValidator()],
        ],
      });
    }
  }

  // creating form for packages
  createPackageForm(data: any) {
    if (data === 'new') {
      return this.fb.group({
        name: ['', [Validators.required, noSpacesValidator()]],
        description: ['', [Validators.required, noSpacesValidator()]],
        exercises: [[], Validators.required],
        subscription: ['', Validators.required],
      });
    } else {
      console.log(data, 'data');

      return this.fb.group({
        name: [data.Packagename, [Validators.required, noSpacesValidator()]],
        description: [
          data.Description,
          [Validators.required, noSpacesValidator()],
        ],
        exercises: [data.Exercises, [Validators.required]],
        subscription: [data.Subscription._id, [Validators.required]],
      });
    }
  }

  // pagination
  pagination(data: any, pagNo: number) {
    const paginationData: any[] = [];
    let end = pagNo * 2;
    let start = end - 2;
    while (start < end) {
      paginationData.push(data[start]);
      console.log(paginationData, 'perf');

      start++;
    }
   
    return paginationData;
  }
}
