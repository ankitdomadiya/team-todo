import { Component } from '@angular/core';

@Component({
  selector: 'app-g-keep',
  templateUrl: './g-keep.component.html',
  styleUrls: ['./g-keep.component.scss']
})
export class GKeepComponent {
  dynamicArray: Array<DynamicGrid> = [];
  newDynamic: any = {};
  ngOnInit(): void {
    this.newDynamic = { completed: false, item: "" };
    this.dynamicArray.push(this.newDynamic);
  }

  addRow() {
    this.newDynamic = { completed: false, item: "" };
    this.dynamicArray.push(this.newDynamic);
    console.log('New row added successfully');
    console.log(this.dynamicArray);
    return true;
  }

  deleteRow(index: any) {
    if (this.dynamicArray.length == 1) {
      console.log('Cant delete the row when there is only one row');
      return false;
    } else {
      this.dynamicArray.splice(index, 1);
      console.log('Row deleted successfully');
      return true;
    }
  }

}
export class DynamicGrid{     
  completed:boolean = false;  
  item?:string;
}
