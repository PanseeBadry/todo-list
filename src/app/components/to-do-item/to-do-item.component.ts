import { Component, EventEmitter, Input, Output } from '@angular/core';
import { todo } from '../../models/todo.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-to-do-item',
  imports: [
    RouterLink
  ],
  templateUrl: './to-do-item.component.html',
  styleUrl: './to-do-item.component.css'
})
export class ToDoItemComponent {
  @Input() todo:todo = {
    id:'',
    completed:false,
    title:"",
    description:""
  }
  @Output() edit  = new EventEmitter()
  @Output() toggle  = new EventEmitter()
  @Output() delete  = new EventEmitter()
  
  onToggle(){
    this.toggle.emit(this.todo)

  }
  onEdit(){
    this.edit.emit(this.todo)

  }
  onDelete(){
    this.delete.emit(this.todo)

  }
  


}
