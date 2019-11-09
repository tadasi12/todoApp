import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { BaseComponent } from '../base.componnet';

import { TodoService } from '../service/todo.service';
import { Todo } from '../todo/todo';


@Component({
  selector: 'app-todo-data',
  templateUrl: './todo-data.component.html',
  styleUrls: ['./todo-data.component.css']
})
export class TodoDataComponent extends BaseComponent implements OnInit {
  
  todoid: number;
  
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public location: Location,
    public todoService: TodoService 
  ) {
    super(todoService, location, router);
  }

  ngOnInit() {
    this.todoid = parseInt(this.route.snapshot.paramMap.get('id'));
    this.todoService.getRow<Todo>(this.todoid)
    .subscribe(
      todo => { this.todo = todo;
      }, error => {
        console.log('エラーですよ'+ error.name);
        this.router.navigate(['/']);
      }
    );
  }
}
