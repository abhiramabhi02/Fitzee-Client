import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';
import {getStorage, ref, deleteObject} from 'firebase/storage'

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firebaseStorage = getStorage()

  constructor(private storage: AngularFireStorage) {}

  uploadNewsImages(file: File): Promise<string> {
    const filePath = `images/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);

    return new Promise<string>((resolve, reject)=>{
      uploadTask.snapshotChanges().pipe(
        finalize(()=>{
          fileRef.getDownloadURL().subscribe((url) => resolve(url),
          (error) => reject(error)
          )
        })
      ).subscribe();
    })
  }

  getFilePath(url:string){
    let start = url.indexOf('/images')
    let end = url.indexOf('?alt')
    let filepath = url.slice(start+1, end)
    return filepath.replace(/%2F/, '/');
  }

  async deleteImage(url:string):Promise<void>{
    const filePath = this.getFilePath(url)
    console.log(filePath, 'file');
    
    const fileRef = ref(this.firebaseStorage, filePath)

    return deleteObject(fileRef)
    .then(()=>{
      console.log('file deleted successfully');
      
    })
    .catch((error)=>{
      console.log('deleting failed', error);
      throw error
      
    })
  }

}

// https://firebasestorage.googleapis.com/v0/b/fitzee-8fb5a.appspot.com/o/images%2FHD-wallpaper-nature-beautiful.jpg?alt=media&token=c1f46c9c-6638-4b41-bdf4-ce05097c72cc
