import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private fb:FormBuilder) { }

  createLoginForm(): FormGroup{
      return this.fb.group({
      email:['', Validators.required],
      password:['', Validators.required],
      trainer:[false]
    })
   }

   createRegisterForm(): FormGroup{
    return this.fb.group({
    name:['', Validators.required],
    email:['', Validators.required],
    password:['', Validators.required],
    cpassword:['', Validators.required]
  })
 }

 createAddItemForm():FormGroup{
  return this.fb.group({
    name:['', Validators.required],
    description:['', Validators.required]
  })
 }

 createEditItemForm():FormGroup{
  return this.fb.group({
    name:['', Validators.required],
    description:['', Validators.required]
  })
 }
}
