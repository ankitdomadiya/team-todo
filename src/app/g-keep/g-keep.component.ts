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
  // FilterEmployeeDetails: Array<TaskDetails> = new Array<TaskDetails>();
  taskDetails!: TaskDetails;
  taskChangeBtn: boolean = false;
  searchValue: string;

  constructor(private Api: TasksService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.taskDetails = new TaskDetails;
    this.taskDetails.ListItems = new Array<Lists>();
    this.addRow();
    this.getMethods();
  }

  // Add Tasks 

  addDetails() {
    if (this.taskDetails.title) {
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
  }

  // Get Tasks

  getMethods() {
    this.Api.getTasks().subscribe({
      next: (res) => {
        this.taskData = res;
      }
    })
  }

  // Fetch Task

  fetchTask(item) {
    this.taskDetails = item;

    // for add and change button name
    this.taskChangeBtn = true;
  }

  // Update Tasks

  updateMethod() {
    this.Api.updateTask(this.taskDetails).subscribe({
      next: (res) => {
        this.getMethods();
        this.taskChangeBtn = false;
      },
      error: (err) => { console.log('found error') },
      complete: () => { this.toastr.success('Task Update Successfull'); }
    })
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

  // Add Row

  addRow() {
    this.taskDetails.ListItems.push(new Lists);
  }

  // Delete Row

  deleteRow(index: any) {
    if (this.taskDetails.ListItems.length != 1) {
      this.taskDetails.ListItems.splice(index, 1);
    }

  }

  // Search Method

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
      // this.taskData = this.taskData;
      this.getMethods();
    }
  }
}
