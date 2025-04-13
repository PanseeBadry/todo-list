import { Routes } from '@angular/router';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import { ToDoItemComponent } from './components/to-do-item/to-do-item.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';

export const routes: Routes = [
    {path:"" ,component:ToDoListComponent},
    {path:"todos" ,component:ToDoListComponent},
    {path:"todo/:id" ,component:TodoDetailsComponent},
    {path:"add" ,component:AddTodoComponent},


   
];
