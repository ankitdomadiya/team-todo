import { Component } from '@angular/core';
import { Lists, TaskDetails, TasksService } from '../api/tasks.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-g-keep',
  templateUrl: './g-keep.component.html',
  styleUrls: ['./g-keep.component.scss']
})
export class GKeepComponent {

  taskData: Array<TaskDetails> = new Array<TaskDetails>();

  // items data
  itemsData: Array<TaskDetails> = new Array<TaskDetails>();
  // FilterEmployeeDetails: Array<TaskDetails> = new Array<TaskDetails>();
  taskDetails?: TaskDetails;
  itemDetails?: Lists;
  singleItems?: Lists;
  taskChangeBtn: boolean = false;
  searchValue: string;
  isDuplicate: boolean = false;
  updateTask: boolean = false;
  updateAddBtn: boolean = false;
  fillBtn: boolean;
  getlistArray: any;
  tasks: any;

  // button on of

  addOneItemBtnToogle = true;

  // button hinde 

  showInputField: boolean = false;


  constructor(private Api: TasksService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.taskDetails = new TaskDetails;
    this.singleItems = new Lists;
    this.taskDetails.tasks = new Array<Lists>();
    this.addRow();
    this.getMethods();
  }

  // button add and hide method 

  toggleInputField(item) {
    if (!this.showInputField) {
      item.isInput = true;
    }
    // this.showInputField = !this.showInputField;
  }

  // Button On Off Method

  buttonAnimation(item) {
    if (this.addOneItemBtnToogle) {
      item.isInput = true;
      this.addOneItemBtnToogle = false;
    }
    else {
      item.isInput = false;
      this.addOneItemBtnToogle = true;
    }
  }


  // duplicate removel 

  duplicateRemove() {
    if (this.taskData.length > 0) {
      for (let item of this.taskData) {
        if (item.name == this.taskDetails.name) {
          this.isDuplicate = false;
        }
        else {
          this.isDuplicate = true;
        }
      }
    }
    else {
      this.isDuplicate = true;
    }
  }

  // Add Tasks 

  addDetails() {
    this.duplicateRemove();
    if (this.isDuplicate) {
      if (this.taskDetails.name) {
        this.Api.addTasks(this.taskDetails).subscribe({
          next: (res) => {
            console.log(res);
            this.getMethods();
            this.taskDetails = new TaskDetails;
            this.addRow();
          },
          error: (err) => { console.log(err) },
          complete: () => { this.toastr.success('Task Add Successfull'); },
        })
      }
      else {
        alert("Name Is Required");
      }
    }
    else {
      this.toastr.warning("Can't Add Duplicate Value")
    }
  }

  addItems(TodoId) {

    this.singleItems.todoId = TodoId;

    let oneData = this.singleItems;
    console.log(oneData);

    this.Api.addItems(TodoId, oneData).subscribe({
      next: (res) => {
        console.log(res);
        this.getMethods();
        this.singleItems = new Lists;
        this.taskDetails = new TaskDetails;
      },
      error: (err) => { console.log(err) },
      complete: () => { this.toastr.success('Task Add Successfull'); },
    })
  }



  // Get Tasks

  getMethods() {
    this.Api.getTasks().subscribe({
      next: (res) => {
        this.taskData = res;
      }
    })
  }

  // get items

  getItems() {
    this.Api.getTasks().subscribe({
      next: (res) => {
        this.itemsData = res;
      },
      error:()=>{
        this.toastr.error('error');
      }
    })
  }

  // Fetch Task

  fetchTask(item: any) {
    this.taskDetails = item;

    // for add and change button name
    this.taskChangeBtn = true;
  }

  // Fetch items

  fetchItem(tasks: any) {
    this.taskDetails = tasks;
    // for add and change button name
    this.taskChangeBtn = true;
  }

  // Update Tasks

  updateMethod() {
    this.Api.updateTask(this.taskDetails).subscribe({
      next: (res) => {
        this.updateItemMethod();
        this.getMethods();
        this.getItems();
        this.taskChangeBtn = false;
      },
      error: (err) => { console.log('found error') },
      complete: () => { this.toastr.success('Task Update Successfull'); }
    })
  }

  // update Items

  updateItemMethod() {
    this.taskDetails.tasks.forEach(element => {
      this.Api.updateItems(this.taskDetails.id, element).subscribe({
        next: (res) => {
          this.getMethods();
          this.getItems();
          this.taskChangeBtn = false;
        },
        error: (err) => { console.log('found error') },
        complete: () => { this.toastr.success('Task Update Successfull'); }
      });
    });
  }

  // Delete Tasks

  deleteTask(item: any) {
    this.Api.deleteTask(item).subscribe({
      next: (res) => {
        this.getMethods();
        this.toastr.success('Task Delete Successfull'); 
      },
      error: (err) => { this.toastr.success('Data Deleted'); },
    })
  }

  // delete items

  deleteItems(TodoId, task: any) {
    this.Api.deleteItems(TodoId, task).subscribe({
      next: (res) => {
        this.getMethods();
        this.toastr.success('Task Delete Successfull');
      },
      error: (err) => { this.toastr.success('Found Problem To Delete Time'); },
    })
    
    setTimeout(() => {
     
    }, 500);
  }

  // close method

  close() {
    this.taskChangeBtn = false;
    this.updateTask = false;
    this.taskDetails = new TaskDetails();
    this.addRow();
  }

  // Add Row

  addRow() {
    this.taskDetails.tasks.push(new Lists);
  }

  // Delete Row

  deleteRow(index: any) {
    if (this.taskDetails.tasks.length != 1) {
      this.taskDetails.tasks.splice(index, 1);
    }
  }

  // search method

  search() {
    if (this.searchValue) {
      let searchEmployee = new Array<TaskDetails>();
      if (this.taskData.length > 0) {
        for (let emp of this.taskData) {
          if (JSON.stringify(emp).toLowerCase().indexOf(this.searchValue.toLowerCase()) > 0) {
            searchEmployee.push(emp);
          }
        }
        this.taskData = searchEmployee;
      }
    }
    else {
      this.getMethods();
    }
  }
}
