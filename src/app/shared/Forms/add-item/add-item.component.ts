import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  @Input() item: string = ''
  addItemForm!:FormGroup
  selectedImage: File | null = null

  @Output() sendData:EventEmitter<any> = new EventEmitter<any>()

  constructor(private service:SharedService){}

  ngOnInit(): void {
    this.addItemForm = this.service.createAddItemForm()
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];    
  }

  onAdd(){
    const data = this.addItemForm.value
    data.image = this.selectedImage
    this.sendData.emit(data)
  }
  
} 
