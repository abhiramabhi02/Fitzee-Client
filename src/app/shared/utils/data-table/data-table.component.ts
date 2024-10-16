import { state } from '@angular/animations';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { log, table } from 'console';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit, OnChanges {
  @Input() itemName: string = '';
  @Input() Headers: string[] = [];
  @Input() keyNames: string[] = [];
  @Input() tableData: any[] = [];
  @Input() isUsers: Boolean = true;
  @Input() addItemUrl!: string;
  @Input() editItemUrl!: string;
  @Input() imageVisibility: boolean = false;
  @Input() totalAmount: number = 0;
  @Output() sendTrigger: EventEmitter<object> = new EventEmitter<object>();
  id: string = 'id';
  Image: string = 'Image';
  paginationNumbers: number[] = [];
  uiData: any[] = [];
  inserted: string = 'InsertedDate';
  lastedited: string = 'LastUpdate';
  joinedDate: string = 'JoinedDate';
  fromDate: string = '';
  toDate: string = '';
  constructor(private router: Router, private service: SharedService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    //  this.initialPageLoad()
    if (this.tableData[0]) {
      let totalpages: number = Math.trunc(this.tableData.length / 5);
      if (this.tableData.length % 5 !== 0) {
        console.log(this.tableData.length % 4 === 1);
        totalpages++;
      }
      console.log(totalpages, 'pages');
      for (let i = 1; i <= totalpages; i++) {
        this.paginationNumbers.push(i);
      }
      this.paginationWorks(1);
    }
  }

  initialPageLoad() {
    if (this.tableData) {
      let pageNo: number = 1;
      let totalpages: number = this.tableData.length / 5;
      if (this.tableData.length % 5 === 1) {
        totalpages + 1;
      }
      while (pageNo <= totalpages) {
        this.paginationNumbers.push(pageNo);
        console.log(this.paginationNumbers, 'lfd');

        pageNo + 1;
      }
    }
  }

  callFunction() {
    this.router.navigate([this.addItemUrl]);
  }

  editClick(id: any) {
    console.log(id);
    const data = this.tableData.filter((item) => item.id === id);
    // this.sendTrigger.emit(data);
    this.router.navigate([this.editItemUrl], { state: { data } });
  }

  updateStatus(id: string) {
    const specificData = this.tableData.filter((item) => item.id === id)[0];
    console.log(id, !specificData.Status, 'data');
    const data = {
      id: id,
      Status: !specificData.Status,
    };
    this.sendTrigger.emit(data);
  }

  updateVerification(id: string) {
    const specificData = this.tableData.filter((item) => item.id === id)[0];
    const data = {
      id: id,
      Verification: !specificData.Verification,
    };
    this.sendTrigger.emit(data);
  }

  deleteClick(id: any) {
    if (window.confirm('Are you sure to delete this data')) {
      console.log(id);
      const urlfile = this.tableData.filter((item) => item.id === id);
      let data = {
        id: id,
        url: urlfile[0].Image,
        call: 'delete',
      };
      this.sendTrigger.emit(data);
    } else {
      console.log('operation aborted');
    }
  }

  paginationWorks(pgNo: number) {
    let result = this.service.pagination(this.tableData, pgNo);
    console.log(result, 'check 436');
    this.uiData = result;
  }

  search(value: string) {
    console.log(value);
    if (value === '') {
      this.uiData = this.tableData;
    } else {
      let searchField: string = '';
      if (this.itemName === 'news') {
        searchField = 'Title';
      } else if (this.itemName === 'package') {
        searchField = 'Packagename';
      } else {
        searchField = 'Name';
      }
      let filteredData = this.tableData.filter((item) =>
        item[searchField]?.toLowerCase().includes(value.toLowerCase())
      );
      this.uiData = filteredData;
      console.log(filteredData);
    }
  }


  applyAllFilters() {
    const selectedSortValue = (document.getElementById('sortDate') as HTMLSelectElement).value;
    const status = (document.getElementById('statusFilter') as HTMLSelectElement).value;
    const fromDate = this.fromDate ? new Date(this.fromDate) : null;
    const toDate = this.toDate ? new Date(this.toDate) : null;
    
    let filterName: string = '';
    let statusField: string = '';
  
    if (this.itemName === 'user' || this.itemName === 'trainer') {
      filterName = 'JoinedDate';
      statusField = 'Verification';
    } else {
      filterName = 'InsertedDate';
      statusField = 'Status';
    }
  
    // Status Filtering
    let filteredData = this.tableData;
  
    if (status !== '') {
      const statusValue = status === 'true';
      filteredData = filteredData.filter(item => item[statusField] == statusValue);
    }
  
    // Date Range Filtering
    filteredData = filteredData.filter(item => {
      const itemDate = new Date(item[filterName]);
  
      if (fromDate && toDate) {
        return itemDate >= fromDate && itemDate <= toDate;
      } else if (fromDate) {
        return itemDate >= fromDate;
      } else if (toDate) {
        return itemDate <= toDate;
      } else {
        return true; 
      }
    });
  
    // Sorting by Date (asc or desc)
    if (selectedSortValue === 'desc') {
      filteredData.sort(
        (a, b) => new Date(b[filterName]).getTime() - new Date(a[filterName]).getTime()
      );
    } else if (selectedSortValue === 'asc') {
      filteredData.sort(
        (a, b) => new Date(a[filterName]).getTime() - new Date(b[filterName]).getTime()
      );
    }
  
    // Set the final filtered and sorted data
    this.uiData = filteredData;
    console.log(this.uiData, 'Filtered and sorted data');
  }
  

  resetFilters(){
    this.uiData = this.tableData
  }
}




// Sort by date (asc or desc)
  // sortByDate(event: Event) {
  //   const selectedValue = (event.target as HTMLSelectElement).value;
  //   console.log(selectedValue);

  //   let newData: any[] = [];
  //   if (selectedValue === 'desc') {
  //     console.log(this.tableData);
  //     newData = this.tableData.sort(
  //       (a, b) =>
  //         new Date(b.InsertedDate).getTime() -
  //         new Date(a.InsertedDate).getTime()
  //     );
  //     console.log(newData, 'newData');
  //   } else if (selectedValue === 'asc') {
  //     console.log(this.tableData);
  //     newData = this.tableData.sort(
  //       (a, b) =>
  //         new Date(a.InsertedDate).getTime() -
  //         new Date(b.InsertedDate).getTime()
  //     );
  //     console.log(newData, 'newData');
  //   }
  //   this.uiData = newData;
  // }

  // // Filter by status
  // filterByStatus(event: any) {
  //   let status = (event.target as HTMLSelectElement).value;
  //   console.log(status);
  //   let statusField: string = '';
  //   if (this.itemName === 'user' || this.itemName === 'trainer') {
  //     statusField = 'Verification';
  //   } else {
  //     statusField = 'Status';
  //   }
  //   let statusValue: boolean;
  //   if (status === '') {
  //     this.uiData = this.tableData;
  //   } else {
  //     if (status === 'true') {
  //       statusValue = true;
  //     } else {
  //       statusValue = false;
  //     }
  //     this.uiData = this.tableData.filter(
  //       (item) => item[statusField] == statusValue
  //     );
  //     console.log(this.uiData, 'data talbe');
  //   }
  // }

  // applyFilters() {
  //   console.log(this.fromDate, this.toDate, 'dates');
  //   const fromDate = this.fromDate ? new Date(this.fromDate) : null;
  //   const toDate = this.toDate ? new Date(this.toDate) : null;
  //   let filterName:string = ''
  //  if(this.itemName === 'user' || this.itemName === 'trainer'){
  //   filterName = 'JoinedDate'
  //  }else{
  //   filterName = 'InsertedDate'
  //  }
  //   const filterData = this.tableData.filter((item)=>{
  //     const itemDate = new Date(item[filterName])
  //     // console.log(itemDate, fromDate, toDate,  'item date');
      

  //     if (fromDate && toDate) {
  //       return itemDate >= fromDate && itemDate <= toDate;
  //     } else if (fromDate) {
  //       return itemDate >= fromDate;
  //     } else if (toDate) {
  //       return itemDate <= toDate;
  //     } else {
  //       return true; // No filtering if no date range is provided
  //     }
  //   })
  //   console.log(filterData, 'filtr fdat');
  //   this.uiData = filterData  
  // }