import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { SelectorListContext } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-package-form',
  templateUrl: './package-form.component.html',
  styleUrls: ['./package-form.component.scss'],
})
export class PackageFormComponent implements OnInit {
  packageForm!: FormGroup;
  @Input() formOperation: string = 'new';
  formFunction: string = 'Add new';

  @Input() exerciseOptions: any[] = [];

  @Input() subscriptionOptions: any[] = [];

  @Output() sendData: EventEmitter<any> = new EventEmitter<any>();

  selectedExercise: any[] = [];

  constructor(private service: SharedService, private router: Router) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.packageForm = this.service.createPackageForm(this.formOperation);
  }

  // extracting ids from the selected exercise array
  extractExerciseArr() {
    const result: string[] = [];
    this.selectedExercise.map((item) => {
      result.push(item.id);
    });
    return result;
  }

  // sending form data to the parent component
  onAdd() {
    const selectExercise = this.extractExerciseArr();
    const data = this.packageForm.value;
    data.exercises = selectExercise;
    this.sendData.emit(data);
    // console.log(data);
  }

  // adding exercise to the selected Exercise Array in the form
  exerciseSelect(event: any) {
    const exerciseId = event.target.value;
    // checking duplicates
    const alreadySelected = this.selectedExercise.some(
      (item) => item.id === exerciseId
    );
    if (!alreadySelected) {
      this.exerciseOptions.forEach((item) => {
        if (exerciseId === item._id) {
          const obj = { id: item._id, name: item.Name };
          this.selectedExercise.push(obj);
        }
      });
    }
  }

  // deselecting exercise from the selected array
  deSelectExercise(id: string) {
    let index = this.selectedExercise.findIndex((item) => item.id === id);
    if (index > -1) {
      this.selectedExercise.splice(index, 1);
    }
  }
}
