import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoDataComponent } from './todo-data/todo-data.component';
import { AddComponent } from './add/add.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: "", redirectTo: '/todo-list', pathMatch: 'full' },
  { path: "todo-list", component: TodoListComponent },
  { path: "todo-data/:id", component: TodoDataComponent },
  { path: "add", component: AddComponent },
  { path: "login", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
