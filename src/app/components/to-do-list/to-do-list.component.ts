import { Component } from '@angular/core';
import { todo } from '../../models/todo.model';
import { ToDoItemComponent } from '../to-do-item/to-do-item.component';
import { TodoService } from '../../services/todo.service';
import { Router, RouterLink } from '@angular/router';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-to-do-list',
  imports: [
    ToDoItemComponent,   
  ],
  providers:[],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.css'
})
export class ToDoListComponent {
  todos:todo[]=[]
  constructor(public todoService:TodoService , public sharedData : SharedDataService, private router:Router) {}
  ngOnInit(){
    this.todoService.getAllTodos().subscribe({
      next:(data:any)=>{this.todos = data.reverse()},
      error:(err:any)=>{console.log('Error in Getting All Todos',err)},
      complete:()=>{console.log('completed')}
    })
  }
  onDeleteTodo(todo:todo){
    this.todoService.deleteTodo(todo).subscribe({
      next:()=>{this.todos = this.todos.filter(t=>t.id != todo.id)},
      error:(err:any)=>{console.log('Error in Deleting Todo ',err)},
      complete:()=>{console.log('completed')}

    })


  }
  onEditTodo(todo:todo){
    const newTitle = prompt('Edit todo title:', todo.title);
  if (newTitle ) {
    const updatedTodo = { ...todo, title: newTitle };
    this.todoService.updateTodo(updatedTodo).subscribe({
      next: (updated:any) => {todo.title = updated.title},
      error:(err:any)=>{console.log('Error in Editing Todo',err)},
      complete:()=>{console.log('completed')}
    });
  }
   
  }
  onToggleTodo(todo:any){
    const updatedTodo = { ...todo, completed: !todo.completed };
    this.todoService.updateTodo(updatedTodo).subscribe({
      next: (updated:any) => {todo.completed = updated.completed;},
      error:(err:any)=>{console.log('Error in Toggling Todo',err)},
      complete:()=>{console.log('completed')}
    });

  }
  add() {
    this.sharedData.sendTodos(this.todos);
    console.log("send data from todo list component to add todo component  ", this.todos);
    this.router.navigate(['/add']);
  }



}
