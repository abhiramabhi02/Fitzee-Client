import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss'],
})
export class AddNewsComponent {
  item: string = 'News';
  downloadUrl: string = '';

  constructor(
    private firebaseService: FirebaseService,
    private service: AdminService,
    private router:Router
  ) {}

  async recieveData(data: { image: File; name: string; description: string }) {
    console.log(data, 'data in add news');
    try {
      const imageurl = await this.firebaseService.uploadNewsImages(data.image);
      this.downloadUrl = imageurl;
      console.log('url', this.downloadUrl);

      const newData = {
        item: 'news',
        title: data.name,
        description: data.description,
        image: this.downloadUrl,
      };
      console.log(newData, 'news');
      this.service.insertItems(newData).subscribe((res: any) => {
        console.log(res);
        if(res.success){
          setTimeout(() => {
            this.router.navigate(['/newsmanagement'])
          }, 1000);
        }
      });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }
}
// https://firebasestorage.googleapis.com/v0/b/fitzee-8fb5a.appspot.com/o/images%2Fimages%20(1).jpeg?alt=media&token=29536cfe-2988-431f-859d-559dfe6dc35d
