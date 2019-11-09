import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { TodoService } from './service/todo.service';
import { Todo } from './todo/todo';

export class BaseComponent {

  tododata: Todo[];
  todo: Todo = new Todo();

  constructor( 
    public todoService: TodoService,
    public location: Location,
    public router: Router,
  ) {}

  add(todo: Todo) {
    this.todoService.add(todo)
    .subscribe(
      _ => { this.goBack() },
      error => {
        console.log('エラーですよ'+ error.name);
        this.router.navigate(['/login/']);
      }
    );
  }

  getTodos() {
      this.todoService.getList<Todo>()
      .subscribe(
        tododata => { this.tododata = tododata },
        error => {
          console.log('エラーですよ'+ error.name);
          this.router.navigate(['/login/']);
        }
      );
  }
  update(): void {
      this.todoService.update(this.todo)
        .subscribe(_ => this.goBack());
  }    

  delete(todo: Todo) {
      this.todoService.delete(todo.id)
      .subscribe(data => this.getTodos());
  }
  goBack(): void {
    this.location.back();
  }
  logout(): void {
    this.todoService.logout();
    this.router.navigate(['/login/']);
  }
}
  