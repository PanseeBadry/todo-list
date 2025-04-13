import { Injectable } from '@angular/core';
import { todo } from '../models/todo.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }
  private dataSource = new BehaviorSubject<any>([]);
  data$ = this.dataSource.asObservable();
  sendTodos(data: any) {
    this.dataSource.next(data);
  }
}
