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
  taskDetails!: TaskDetails;
  toster: any;

  constructor(private Api: TasksService, private toastr: ToastrService){}
  
  ngOnInit(): void {

    this.taskDetails = new TaskDetails;
    this.taskDetails.ListItems = new Array<Lists>();

    this.addRow();
    this.getMethods();
  }
  // Add Tasks 

  addDetails(){
    if(this.taskDetails.title){

      this.Api.addTasks(this.taskDetails).subscribe({
        next:(res)=>{console.log(res);
          this.getMethods();
          this.taskDetails = new TaskDetails;
          this.addRow();
        },
        error:(err)=>{console.log(err)},
        complete:()=>{this.toster.success('complete');},
      })
    }
  }

  // Get Tasks

  getMethods(){
    this.Api.getTasks().subscribe({
      next:(res)=>{
        this.taskData=res;
      }
    })
  }


  addRow() {
    this.taskDetails.ListItems.push(new Lists);
  }

  deleteRow(index: any) {
    if (this.taskDetails.ListItems.length == 1) {
      this.taskDetails.ListItems.splice(index, 1);
  }

}
}
