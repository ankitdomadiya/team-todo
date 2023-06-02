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

  taskDetails: TaskDetails;
  taskInnerItem: Todo;
  editTask: Todo;

  searchValue: string;

  isTaskChangeBtn: boolean = false;
  isDuplicateRemove: boolean = false;
  // tasks: any;
  // button on of
  isAddOneItemBtnToogle = true;
  // button hinde 
  isShowInputField: boolean = false;

  constructor(private Api: TasksService, private toastr: ToastrService) { }

  isLoading: Subject<boolean> = this.Api.isLoading;

  ngOnInit(): void {
    this.taskDetails = new TaskDetails;
    this.taskInnerItem = new Todo;
    this.editTask = new Todo;
    this.taskDetails.tasks = new Array<Todo>();
    this.getMainTask();
  }

  // button add and hide method 
  toggleInputField(item) {
    if (!this.isShowInputField) {
      item.isInput = true;
    }
  }

  // Button On Off Method
  buttonAnimation(item) {
    if (item.isInput) {
      item.isInput = false;
    }
    else {
      item.isInput = true;
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
            this.getMainTask();
            this.taskDetails = new TaskDetails;
          },
          error: (err) => { this.toastr.error('error'); },
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
    this.Api.addInnerItem(TodoId, oneData).subscribe({
      next: (res) => {
        this.getMainTask();
        this.taskInnerItem = new Todo;
        this.taskDetails = new TaskDetails;
      },
      error: (err) => { this.toastr.error('Found Error'); },
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
      error: (err) => {
        this.Api.loaderShow();
      },
      complete: () => {
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
  editTodo(item: any) {
    this.editTask = item;
    if (item.isTodoInput) {
      item.isTodoInput = false;
    }
    else {
      item.isTodoInput = true;
    }

    // for add and change button name
    this.isTaskChangeBtn = true;
  }

  // Fetch items
  editItem(tasks: any) {
    // this.taskDetails = tasks;

    // for add and change button name
    // this.taskChangeBtn = true;
    this.editTask = tasks;
    if (tasks.isTaskInput) {
      tasks.isTaskInput = false;
    }
    else {
      tasks.isTaskInput = true;
    }
  }

  /**
   * use for update title
   * @param updateMainTaskDetail
   */
  // Update Tasks
  updateMainTaskDetail() {
    this.Api.updateMainTask(this.editTask).subscribe({
      next: (res) => {
        this.getMainTask();
        // this.getItems();
        this.isTaskChangeBtn = false;
        this.toastr.success('Task Update Successfull');
      },
      error: (err) => { this.toastr.error('error'); },
    })
  }

  /**
   * use for update item
   * @param updateItemMethod
   */
  // update Items
  updateItemMethod(todoId, task) {
    this.Api.updateInnerItem(todoId, this.editTask).subscribe({
      next: (res) => {
        this.getMainTask();
        this.getItems();
        this.isTaskChangeBtn = false;
        task.isTaskInput = false;

      },
      error: (err) => { this.toastr.error('error'); },
    });
  }

  isTaskCompleted(todoId, initems) {

    this.Api.updateInnerItem(todoId, initems).subscribe({
      next: (res) => {
        // this.getMainTask();
        this.getItems();

      },
      error: (err) => { this.toastr.error('error'); },
    });
  }

  /**
   * use for delete full todo
   * @param deleteTask 
   */
  // Delete Tasks
  deleteTodo(item: any) {
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
    this.isTaskChangeBtn = false;
    this.taskDetails = new TaskDetails();
    // this.taskInnerItem = new Todo();
  }
  closeIn(items) {
    this.isTaskChangeBtn = false;
    items.isTaskInput = false;
    this.taskDetails = new TaskDetails();
    // this.taskInnerItem = new Todo();
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

