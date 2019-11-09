import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of , throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: string;
  password: string;

  LoginToken: any = {};
  userLogin: boolean = false;
  signUp: boolean = false;
  userInfo: any = {};

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private todoService: TodoService
  ) { }

  ngOnInit() {
  }

  login() {
    this.todoService.login(this.user, this.password)
    .subscribe(_=> this.router.navigate(['/']))
    ;
  }
  // checkLogin() {
  //   if (localStorage.getItem('auth_angular_user')) {
  //     this.userLogin = true;
  //     this.LoginToken = JSON.parse(localStorage.getItem('auth_angular_user'));
  //     this.fetchUserInfo();
  //   } else {
  //     this.router.navigate(['/auth']);
  //   }
  // }
}
