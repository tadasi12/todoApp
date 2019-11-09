import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { BaseComponent } from '../base.componnet';
import { TodoService } from '../service/todo.service';
import { Todo } from '../todo/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent extends BaseComponent implements OnInit {

  constructor( public location: Location, public todoService: TodoService, public router: Router, ) {
    super(todoService, location, router);
   }

  ngOnInit() {
    this.getTodos();
  }
}
