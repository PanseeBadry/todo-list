import { Component } from '@angular/core';
import { todo } from '../../models/todo.model';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-details',
  imports: [],
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.css'
})
export class TodoDetailsComponent {
  todo: todo = {
    id: "",
    completed: false,
    title: '',
    description: ''
  }
  constructor(public todoService:TodoService, public myRoute:ActivatedRoute){
    this.todo.id=myRoute.snapshot.params['id']
  }
  ngOnInit(){
    this.todoService.getTodoById(this.todo).subscribe({
      next:(data:any)=>{this.todo = data},
      error:(err)=>{console.log('Error Getting Todo' , err)},
      complete:()=>{console.log('completed')}
    })

  }


}
