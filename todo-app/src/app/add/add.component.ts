import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { BaseComponent } from '../base.componnet';
import { TodoService } from '../service/todo.service';
import { Todo } from '../todo/todo';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent extends BaseComponent implements OnInit {

  constructor( 
    public todoService: TodoService,
    public location: Location,
    public router: Router
  ) {
    super(todoService, location, router);
    this.todo.status = false;
  }

  ngOnInit() {
  }

}
