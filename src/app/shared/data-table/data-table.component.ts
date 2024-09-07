import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

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
  @Output() sendTrigger: EventEmitter<object> = new EventEmitter<object>();
  id: string = 'id';
  Image:string = 'Image'
  constructor(private router: Router) {}

  ngOnInit(): void {}

  callFunction() {
    this.router.navigate([this.addItemUrl]);
  }

  editClick(id: any) {
    console.log(id);
    let data = {
      id: id,
      call: 'edit',
    };
    // this.sendTrigger.emit(data);
    this.router.navigate(['/editnews'])
  }

  deleteClick(id: any) {
    if (window.confirm('Are you sure to delete this data')) {
      console.log(id);
      let data = {
        id: id,
        call: 'delete',
      };
      this.sendTrigger.emit(data);
      
    }else{
      console.log('operation aborted');
      
    }
  }
}
