import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Input() isAdmin: Boolean = false;
  Role: string = 'User';
  loginForm!: FormGroup;
  @Output() formData:EventEmitter<Object> = new EventEmitter<Object>() 

  constructor(private fb: FormBuilder, private service: SharedService) {}

  ngOnInit(): void {
    if (this.isAdmin) {
      this.Role = 'Admin';
    }
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.service.createLoginForm();
  }

  login(): void {
    if (this.loginForm.valid) {
      const data = this.loginForm.value;
      this.formData.emit(data);
    } else {
      this.loginForm.markAllAsTouched(); 
    }
  }

  
}
