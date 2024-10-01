import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-personal-details',
  templateUrl: './update-personal-details.component.html',
  styleUrls: ['./update-personal-details.component.scss'],
})
export class UpdatePersonalDetailsComponent {
  userForm: FormGroup;
  image: any;

  constructor(
    public dialogRef: MatDialogRef<UpdatePersonalDetailsComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = this.fb.group({
      image: [null],
      age: [data.Age || '', Validators.required], // Keep the field name as "age"
      gender: [data.Gender || '', Validators.required],
      height: [data.Height || '', [Validators.required, Validators.min(50), Validators.max(250)]],
      weight: [data.Weight || '', [Validators.required, Validators.min(30), Validators.max(200)]]
    });
    this.image = data.Image;
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.image = file;
    if (file) {
      this.userForm.patchValue({
        image: file
      });
    }
  }

  onSave(): void {
    if (this.userForm.valid) {
      let data = this.userForm.value
      data.image = this.image
      
      this.dialogRef.close(data);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
