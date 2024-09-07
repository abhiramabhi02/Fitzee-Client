import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
  @Input() item: string = ''
  editForm!:FormGroup
  selectedImage: File | null = null

constructor(private service:SharedService){}

ngOnInit(): void {
  this.editForm = this.service.createEditItemForm()
}

onFileSelected(event: any) {
  this.selectedImage = event.target.files[0];    
}

onEdit(){
  console.log(this.editForm.value);
  
}

}
