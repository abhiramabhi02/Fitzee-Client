import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-package-edit',
  templateUrl: './package-edit.component.html',
  styleUrls: ['./package-edit.component.scss'],
})
export class PackageEditComponent implements OnInit {
  packageEditForm!: FormGroup;
  @Input() formOperation!: string;
  formFunction: string = 'Edit';

  @Input() exerciseOptions: any[] = [];

  @Input() subscriptionOptions: any[] = [];

  @Output() sendData: EventEmitter<any> = new EventEmitter<any>();

  selectedExercise: any[] = [];

  packageData: any = {};

  constructor(private service: SharedService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.packageData = navigation.extras.state;
    }
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    const data = this.extractEditData();    
    data.Exercises.map((item: any) =>
      this.selectedExercise.push({ id: item._id, name: item.Name })
    );   
    console.log(this.selectedExercise, 'refd');
    
    this.packageEditForm = this.service.createPackageForm(data);
  }


  extractEditData() {
    let data = this.packageData;
    for (let item in data) {
      data = data[item][0];
    }
    return data;
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
    const packageData = this.extractEditData()    
    const selectExercise = this.extractExerciseArr();
    const data = this.packageEditForm.value;
    data.exercises = selectExercise;
    data.id = packageData.id
    this.sendData.emit(data);
  }

  // adding exercise to the selected Exercise Array in the form
  exerciseSelect(event: any) {
    const exerciseId = event.target.value;
    // checking duplicated
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
