import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from 'src/environment/config';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  httpHeaders: HttpHeaders | { [header: string]: string | string[]; };
  isLoading = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }
  __taskUrl =  enviroment.__taskUrl;

  // Loader Show
  loaderShow() {
    // document.body.style.pointerEvents='none';
    this.isLoading.next(true);
  }
  
  // Loader Hide
  loaderHide() {
    // document.body.style.pointerEvents='';
    this.isLoading.next(false);
  }

  // post api
  // use for add tasks
  addMainTask(body: TaskDetails) {
    return this.http.post(this.__taskUrl, body);
  }

  addInnerItem(TodoId,body: Todo) {
    return this.http.post(`${this.__taskUrl}/${TodoId}/task`, body);
  }

  // get api
  // use for get tasks
  getTasks() {
    return this.http.get<Array<TaskDetails>>(this.__taskUrl);
  }

  // put api
  // update tasks
  updateMainTask(body: any) {
    return this.http.put(`${this.__taskUrl}/${body.id}`, body);
  }

  // updateitems
  updateInnerItem(TodoId,body: any) {
    return this.http.put(`${this.__taskUrl}/${TodoId}/task/${body.id}`, body);
  }

  // use for delete tasks
  deleteTask(id: any) {
    return this.http.delete(`${this.__taskUrl}/${id}`);
  }

  // delete items
  deleteItems(TodoId,id: any) {
    return this.http.delete (`${this.__taskUrl}/${TodoId}/task/${id}`);
  }
}

export class TaskDetails {
  id: number;
  name: string;
  addedon:any = new Date();
  tasks: Array<Todo> = new Array<Todo>();

  // UI
  isInput:boolean = false;
  isTodoInput: boolean;
}
export class Todo {
  id:number;
  todoId:number;
  name: string;
  isCompleted: boolean ;

  // Ui specifcy
  isTaskInput: boolean;
  
}