import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-exercise-management',
  templateUrl: './exercise-management.component.html',
  styleUrls: ['./exercise-management.component.scss'],
})
export class ExerciseManagementComponent implements OnInit {
  isAdmin: Boolean = true;
  isLoggedIn: Boolean = true;
  headers: string[] = [];
  keynames: string[] = [];
  Data: any[] = [];
  user: Boolean = false;

  constructor(private service: AdminService) {}

  ngOnInit(): void {
    this.service.getAllExercise().subscribe((res: any) => {
      const result = this.service.exerciseSorting(res);
      this.keynames = result.keys;
      this.headers = result.keys;
      this.Data = result.items;
    });
  }
}
