import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.scss']
})
export class AddExerciseComponent {
item:string = 'Exercise'
downloadUrl: string = '';

  constructor(
    private firebaseService: FirebaseService,
    private service:AdminService,
    private router:Router
  ) {}

  async recieveData(data: { image: File; name: string; description: string }) {

    try {
      const imageurl = await this.firebaseService.uploadNewsImages(data.image);
      this.downloadUrl = imageurl;

      const exerciseData = {
        item: 'exercise',
        name: data.name,
        description: data.description,
        image: this.downloadUrl,
      };
      console.log(exerciseData, 'exercise');
      this.service.insertItems(exerciseData).subscribe((res: any) => {
        console.log(res);
        if(res.success){
          setTimeout(() => {
            this.router.navigate(['/exercisemanagement'])
          }, 1000);
        }
      });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }
}
