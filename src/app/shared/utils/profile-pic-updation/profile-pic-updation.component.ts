import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-profile-pic-updation',
  templateUrl: './profile-pic-updation.component.html',
  styleUrls: ['./profile-pic-updation.component.scss']
})
export class ProfilePicUpdationComponent {

  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(public dialogRef: MatDialogRef<ProfilePicUpdationComponent>, private fireService:FirebaseService) {}

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLElement;
    fileInput.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      // Create image preview
      const reader = new FileReader();
      reader.onload = (e) => this.previewUrl = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  
  updateProfilePicture(): void {
    if (this.selectedFile) {
     
      console.log('Updating profile picture:', this.selectedFile);
      this.dialogRef.close(this.selectedFile);  
    }
  }
}
