import { state } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  @Input() Headers: string[] = [];
  @Input() keyNames: string[] = [];
  @Input() tableData: any[] = [];
  @Input() isUsers: Boolean = true;
  @Input() addItemUrl!: string;
  @Input() editItemUrl!: string;
  @Input() imageVisibility: boolean = false
  @Output() sendTrigger: EventEmitter<object> = new EventEmitter<object>();
  id: string = 'id';
  Image: string = 'Image';
  paginationNumbers:number[] = [1,2,3,4]
  uiData:any[] = []
  inserted:string = 'InsertedDate'
  lastedited:string = 'LastUpdate'
  constructor(private router: Router, private service:SharedService) {}

  ngOnInit(): void {}

  callFunction() {
    this.router.navigate([this.addItemUrl]);
  }

  editClick(id: any) {
    console.log(id);
    const data = this.tableData.filter((item) => item.id === id)
    // this.sendTrigger.emit(data);
    this.router.navigate([this.editItemUrl], { state: { data } });
  }

  updateStatus(id:string){
    const specificData = this.tableData.filter(item => item.id === id)[0]
    console.log(id, !specificData.Status, 'data');
    const data = {
      id:id,
      Status:!specificData.Status
    }
    this.sendTrigger.emit(data)
  }

  updateVerification(id:string){
    const specificData = this.tableData.filter(item => item.id === id)[0]
    const data = {
      id:id,
      Verification:!specificData.Verification
    }
    this.sendTrigger.emit(data)
  }

  deleteClick(id: any) {
    if (window.confirm('Are you sure to delete this data')) {
      console.log(id);
      const urlfile = this.tableData.filter(item => item.id === id)      
      let data = {
        id: id,
        url:urlfile[0].Image,
        call: 'delete',
      };
      this.sendTrigger.emit(data);
    } else {
      console.log('operation aborted');
    }
  }

  paginationWorks(pgNo:number){
   let result = this.service.pagination(this.tableData, pgNo)
   console.log(result);
   this.uiData = result
   
  }

}
