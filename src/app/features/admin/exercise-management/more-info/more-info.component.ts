import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../services/admin.service';
import { serverResponse } from 'src/app/shared/interfaces/response.interface';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.scss'],
})
export class MoreInfoComponent implements OnInit {
  exerciseForm!: FormGroup;
  exerciseData: any[] = []
  exerciseId: string = '';

  constructor(
    private service:AdminService,
    public dialogRef: MatDialogRef<MoreInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.exerciseId = data.id
  }

  ngOnInit(): void {
    const data = {
      id:this.exerciseId,
      role:'exercise'
    }
      this.service.getItemById(data).subscribe({
        next:(res:serverResponse)=>{
          console.log(res);
          this.exerciseData = res.items
        }
      })
      this.exerciseForm = this.service.createExerciseMoreInfo(this.exerciseData[0] || null)
 
  }

  onSubmit(): void {
    if (this.exerciseForm.valid) {
      const data = {
        id:this.exerciseId,
        result:this.exerciseForm.value
      }
      this.dialogRef.close(data);
    }
  }
}
