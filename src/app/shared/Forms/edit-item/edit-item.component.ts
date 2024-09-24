import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';

export interface news {
  id:string;
  name: string;
  description: string;
  image: File | null;
}

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss'],
})
export class EditItemComponent implements OnInit {
  @Input() item: string = '';
  editForm!: FormGroup;
  selectedImage: File | null = null;
  itemData: any = {};
  @Output() editTrigger: EventEmitter<news> = new EventEmitter<news>();

  constructor(private service: SharedService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.itemData = navigation.extras.state;
    }
  }

  ngOnInit(): void {
    // console.log(this.itemData, 'in');
    let data = this.extractData()
    
    this.editForm = this.service.createEditForm(data);
  }

  extractData(){
    let data = this.itemData;
    for (let item in data) {
      data = data[item][0];
    }    
    return data
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  onEdit() {
    const data = this.editForm.value;
    let initialData = this.extractData()
    data.id = initialData.id
    if (!this.selectedImage) {
      this.editTrigger.emit(data);
    } else {
      data.image = this.selectedImage;
      this.editTrigger.emit(data);
    }
  }
}
