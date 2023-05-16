import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  userUrl = 'http://localhost:3000/tasks';

  // post api

  addTasks(body: TaskDetails){
   return this.http.post(this.userUrl,body);
  }

  getTasks(){
    return this.http.get<Array<TaskDetails>>(this.userUrl);
  }
}

export class TaskDetails{
  id?: number;
  title?: string;
  ListItems?:Array<Lists> = new Array<Lists>()
}

export class Lists{
  items?: string;
  checkbox: boolean = false;
}