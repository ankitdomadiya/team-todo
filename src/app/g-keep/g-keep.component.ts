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
  taskChangeBtn: boolean = false;
  searchValue: string;
  isDuplicate: boolean = false;
  updateTask: boolean = false;
  updateAddBtn: boolean = false;
  fillBtn: boolean;
  getlistArray: any;

  tasks: any;

  constructor(private Api: TasksService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.taskDetails = new TaskDetails;
    this.taskDetails.tasks = new Array<Lists>();
    this.addRow();
    this.getMethods();
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

      }
    })
  }

  // Fetch Task

  fetchTask(item) {
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
        this.taskChangeBtn = false;
      },
      error: (err) => { console.log('found error') },
      complete: () => { this.toastr.success('Task Update Successfull'); }
    })
  }

  // update Items

  updateItemMethod() {
    this.taskDetails.tasks.forEach(element => {
      this.Api.updateItems(element).subscribe({
        next: (res) => {
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
      },
      error: (err) => { this.toastr.success('Found Problem To Delete Time'); },
      complete: () => { this.toastr.success('Task Delete Successfull'); }
    })
  }

  // delete items

  deleteItems(task: any) {
    this.Api.deleteItems(task).subscribe({
      next: (res) => {
        this.getItems();
      },
      error: (err) => { this.toastr.success('Found Problem To Delete Time'); },
      complete: () => { this.toastr.success('Task Delete Successfull'); }
    })
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
