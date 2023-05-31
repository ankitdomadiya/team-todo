import { Component } from '@angular/core';
import { Todo, TaskDetails, TasksService } from '../api/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-g-keep',
  templateUrl: './g-keep.component.html',
  styleUrls: ['./g-keep.component.scss']
})

export class GKeepComponent {

  mainTaskData: Array<TaskDetails> = new Array<TaskDetails>();
  // items data
  todoData: Array<TaskDetails> = new Array<TaskDetails>();
  taskDetails?: TaskDetails;
  itemDetails?: Todo;
  taskInnerItem?: Todo;
  taskChangeBtn: boolean = false;
  searchValue: string;
  isDuplicateRemove: boolean = false;
  updateMainTask: boolean = false;
  // tasks: any;
  // button on of
  addOneItemBtnToogle = true;
  // button hinde 
  showInputField: boolean = false;

  constructor(private Api: TasksService, private toastr: ToastrService) { }

  isLoading: Subject<boolean> = this.Api.isLoading;

  ngOnInit(): void {
    this.taskDetails = new TaskDetails;
    this.taskInnerItem = new Todo;
    this.taskDetails.tasks = new Array<Todo>();
    this.addRowTaskAddTime();
    this.getMainTask();
  }

  // button add and hide method 
  toggleInputField(item) {
    if (!this.showInputField) {
      item.isInput = true;
    }
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

  /**
   * this is use for remove diplicate vale and not allow duplicate value
   * @param duplicateRemove
   * 
   */
  // duplicate removel 
  duplicateRemove() {
    if (this.mainTaskData.length > 0) {
      for (let item of this.mainTaskData) {
        if (item.name == this.taskDetails.name) {
          this.isDuplicateRemove = false;
        }
        else {
          this.isDuplicateRemove = true;
        }
      }
    }
    else {
      this.isDuplicateRemove = true;
    }
  }

  /**
   * use for add title in todo
   * @param addAllDetails
   */
  // Add Tasks 
  addAllDetails() {
    this.duplicateRemove();
    if (this.isDuplicateRemove) {
      if (this.taskDetails.name) {
        this.Api.addMainTask(this.taskDetails).subscribe({
          next: (res) => {
            console.log(res);
            this.getMainTask();
            this.taskDetails = new TaskDetails;
            this.addRowTaskAddTime();
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

  /**
   * 
   * use for add items in todo 
   * @param addInnerItem
   */
  addInnerItem(TodoId) {
    this.taskInnerItem.todoId = TodoId;
    let oneData = this.taskInnerItem;
    console.log(oneData);
    this.Api.addInnerItem(TodoId, oneData).subscribe({
      next: (res) => {
        console.log(res);
        this.getMainTask();
        this.taskInnerItem = new Todo;
        this.taskDetails = new TaskDetails;
      },
      error: (err) => { console.log(err) },
      complete: () => { this.toastr.success('Task Add Successfull'); },
    })
  }

  /**
   * use for get title in todo
   * @param getMainTask
   */
  // Get Tasks
  getMainTask() {
    this.Api.loaderShow();
    this.Api.getTasks().subscribe({
      next: (res) => {
        this.mainTaskData = res;
      },
      error:(err)=>{
        this.Api.loaderShow();
      },
      complete:()=>{
        this.Api.loaderHide();
      }
    })
  }

  /**
   * use for get Items in  todo
   */
  // get items
  getItems() {
    this.Api.getTasks().subscribe({
      next: (res) => {
        this.todoData = res;
      },
      error: () => {
        this.toastr.error('error');
      }
    })
  }

  // Fetch Task
  fillTaskEditMode(item: any) {
    this.taskDetails = item;

    // for add and change button name
    this.taskChangeBtn = true;
  }

  // Fetch items
  fillItemEditMode(tasks: any) {
    this.taskDetails = tasks;

    // for add and change button name
    this.taskChangeBtn = true;
  }

  /**
   * use for update title
   * @param updateMainTaskDetail
   */
  // Update Tasks
  updateMainTaskDetail() {
    this.Api.updateMainTask(this.taskDetails).subscribe({
      next: (res) => {
        this.updateItemMethod();
        this.getMainTask();
        this.getItems();
        this.taskChangeBtn = false;
        this.toastr.success('Task Update Successfull');
      },
      error: (err) => { console.log('found error') },
    })
  }

  /**
   * use for update item
   * @param updateItemMethod
   */
  // update Items
  updateItemMethod() {
    this.taskDetails.tasks.forEach(element => {
      this.Api.updateInnerItem(this.taskDetails.id, element).subscribe({
        next: (res) => {
          this.getMainTask();
          this.getItems();
          this.taskChangeBtn = false;
        },
        error: (err) => { console.log('found error') },
      });
    });
  }

  /**
   * use for delete full todo
   * @param deleteTask 
   */
  // Delete Tasks
  deleteTask(item: any) {
    this.Api.deleteTask(item).subscribe({
      next: (res) => {
        this.getMainTask();
        this.toastr.error('Data Delete Successfull');
      },
      error: (err) => { this.toastr.success('Data Deleted'); },
    })
  }

  /**
 * This method is use for delete items in todo
 * @param deleteItems
 */
  // delete items
  deleteItems(TodoId, task: any) {
    this.Api.deleteItems(TodoId, task).subscribe({
      next: (res) => {
        this.getMainTask();
        this.toastr.error('Task Delete Successfull');
      },
      error: (err) => { this.toastr.success('Found Problem To Delete Time'); },
    })
    setTimeout(() => {
    }, 500);
  }

  // close method
  close() {
    this.taskChangeBtn = false;
    this.updateMainTask = false;
    this.taskDetails = new TaskDetails();
    this.addRowTaskAddTime();
  }

  /**
   * use for add row whenever we want to add task in to to start level
   * @param addRowTaskAddTime
   */
  // Add Row
  addRowTaskAddTime() {
    this.taskDetails.tasks.push(new Todo);
  }

  /**
   * 
   * @param index use for delete row whenever we add task first time
   * @param deleteRow
   */
  // Delete Row
  deleteRow(index: any) {
    if (this.taskDetails.tasks.length != 1) {
      this.taskDetails.tasks.splice(index, 1);
    }
  }

  /**
   * search method are use for search todos and items both 
   * @param search
   */
  // search method
  search() {
    if (this.searchValue) {
      let searchEmployee = new Array<TaskDetails>();
      if (this.mainTaskData.length > 0) {
        for (let emp of this.mainTaskData) {
          if (JSON.stringify(emp).toLowerCase().indexOf(this.searchValue.toLowerCase()) > 0) {
            searchEmployee.push(emp);
          }
        }
        this.mainTaskData = searchEmployee;
      }
    }
    else {
      this.getMainTask();
    }
  }
}

