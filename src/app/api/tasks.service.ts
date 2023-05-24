import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  httpHeaders: HttpHeaders | { [header: string]: string | string[]; };

  constructor(private http: HttpClient) { }

  __taskUrl = 'http://10.10.5.107:16100/Todo';

  // post api
  // use for add tasks

  addTasks(body: TaskDetails) {
    return this.http.post(this.__taskUrl, body);
  }

  // get api
  // use for get tasks

  getTasks() {
    // return this.http.get<Array<TaskDetails>>(this.__taskUrl, {headers: this.httpHeaders});
    return this.http.get<Array<TaskDetails>>(this.__taskUrl);

  }

  // put api
  // update tasks

  updateTask(body: any) {
    return this.http.put(`${this.__taskUrl}/${body.id}`, body);
  }

  // updateitems

  updateItems(body: any) {
    return this.http.put(`http://10.10.5.107:16100/Todo/task/${body.id}`, body);
  }

  // update task items

  // updateItem(body: any) {
  //   return this.http.put(`${"http://10.10.5.107:16100/Todo/task"}/${body.id}`, body);
  // }

  // use for delete tasks

  deleteTask(id: any) {
    return this.http.delete(`${this.__taskUrl}/${id}`);
  }

  // delete items

  deleteItems(id: any) {
    return this.http.delete(`http://10.10.5.107:16100/Todo/task/${id}`);
  }
}

// export class TaskDetails{
//   id?: number ;
//   title?: string;
//   ListItems?:Array<Lists> = new Array<Lists>();
// }

// export class Lists{
//   items?: string;
//   checkbox: boolean = false;
// }
export class TaskDetails {
  id?: number;
  name?: string;
  addedon:Date|any = new Date();
  tasks?: Array<Lists> = new Array<Lists>();
}

export class Lists {
  id:number;
  todoId:number;
  name?: string;
  iscompleted: boolean = false;
}