import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { SharedDataService } from '../../services/shared-data.service';
import { todo } from '../../models/todo.model';
import { Router} from '@angular/router';

@Component({
  selector: 'app-add-todo',
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  providers:[],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css'
})
export class AddTodoComponent {
  constructor(public todoService:TodoService ,public sharedData:SharedDataService  , private router:Router){}
  isValidTitle:boolean=true
  isValidDescription:boolean=true
  recievedTodos:todo[]=[] 
  ngOnInit() {
    this.sharedData.data$.subscribe(data => {
      if (data) {
        // console.log('recieved:', data);
        this.recievedTodos = data;
      } else {
        console.log('No data received.');
      }
    });
  }
  todoForm = new FormGroup({
    title:new FormControl('',Validators.required),
    description:new FormControl('',Validators.required)
  })
  

  onSubmit(){
    // console.log("after clicking button",this.recievedTodos)
    this.isValidTitle = this.getValidTitle()
    this.isValidDescription = this.getValidDescription()
    const newId = (this.recievedTodos.length+1).toString()
    if(this.todoForm.valid){
      const addedTodo = { 
        id: newId, 
        completed: false, 
        title: this.todoForm.value.title || '', 
        description: this.todoForm.value.description || '' 
      };
      // console.log("added todo",addedTodo)
      
      this.todoService.addTodo(addedTodo).subscribe({
        next:()=>{this.recievedTodos.unshift(addedTodo)},
        error:(err)=>{console.log("Error in Adding Todo",err)},
        complete:()=>{console.log('completed')}

      })
      this.router.navigate(['/'])

    }

  }
  getValidTitle(){
    return this.todoForm.controls.title.valid
  }
  getValidDescription(){
    return this.todoForm.controls.description.valid
  }


}
