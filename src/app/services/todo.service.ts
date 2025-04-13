import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly url = "http://localhost:3000/todos"
  constructor(private readonly http:HttpClient) { }
  getAllTodos(){
    return this.http.get(this.url)
  }
  updateTodo(updatedTodo:todo){
    return this.http.put(this.url+"/"+updatedTodo.id,updatedTodo)
  }
  deleteTodo(todo:todo){
    console.log(todo)
    return this.http.delete(this.url+"/"+todo.id)
  }
  addTodo(addedTodo:todo){
    return this.http.post(this.url,addedTodo)

  }
  getTodoById(todo:todo){
    return this.http.get(this.url+"/"+todo.id)

  }
}
