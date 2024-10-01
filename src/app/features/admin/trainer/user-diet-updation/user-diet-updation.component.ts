import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-diet-updation',
  templateUrl: './user-diet-updation.component.html',
  styleUrls: ['./user-diet-updation.component.scss']
})
export class UserDietUpdationComponent implements OnInit {
  nutritionForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserDietUpdationComponent>
  ) {}

  ngOnInit(): void {
    this.nutritionForm = this.fb.group({
      Calories: ['', [Validators.required, Validators.min(0)]],
      Protein: ['', [Validators.required, Validators.min(0)]],
      Carbohydrate: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {
    if (this.nutritionForm.valid) {
      this.dialogRef.close(this.nutritionForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
