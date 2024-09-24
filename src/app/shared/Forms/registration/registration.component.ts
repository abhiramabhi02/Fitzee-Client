import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  @Input() isAdmin: Boolean = false;
  Role: string = 'User';
  registerForm!: FormGroup;
  @Output() formData:EventEmitter<Object> = new EventEmitter<Object>() 

  constructor(private fb: FormBuilder, private service: SharedService) {}

  ngOnInit(): void {
    if (this.isAdmin) {
      this.Role = 'trainer';
    }
    this.createForm();
  }

  createForm(): void {
    this.registerForm = this.service.createRegisterForm();
  }

  register() {
    const data = this.registerForm.value
    this.formData.emit(data)
  }
}
