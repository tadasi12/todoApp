import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponseBase } from '@angular/common/http';

import { Observable, of , throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Todo } from './todo/todo';

interface Entity {
    id: number;
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class GenericService {

  url = 'http://tadasi12.pythonanywhere.com/api/'; // Web APIのURL
  loginUrl = 'http://tadasi12.pythonanywhere.com/login/';
 
  token: string;

  constructor( public http: HttpClient, url: string ) { 
      this.url += url + '/'; 
  }

  /** サーバーから一覧を取得する */
  getList<T>(): Observable<T[]> {
    httpOptions.headers = httpOptions.headers.set('Authorization', 'JWT ' + this.token);
    
    return this.http.get<T[]>(this.url, httpOptions)
    .pipe(
      tap(todos => this.log('fetched todos')),
      catchError(this.handleError)
    );
  };
  /** IDから取得する。見つからなかった場合は404を返却する。 */
  getRow<T>(id: number): Observable<T> {
    httpOptions.headers = httpOptions.headers.set('Authorization', 'JWT ' + this.token);
    const url = `${this.url}${id}/`;

    return this.http.get<T>(url, httpOptions).pipe(
      tap(_ => this.log(`fetched todo id=${id}`)),
      catchError(this.handleError)
    );
  }

  add(todo: Todo): Observable<Object> {
    httpOptions.headers = httpOptions.headers.set('Authorization', 'JWT ' + this.token);
    
    return this.http.post(this.url, todo,httpOptions).pipe(
      tap(_ => this.log(`add todo`)),
      catchError(this.handleError)
    );
  }

  /** 更新 */
  update<T extends Entity>(obj: T): Observable<any> {
    httpOptions.headers = httpOptions.headers.set('Authorization', 'JWT ' + this.token);
    const url = `${this.url}${obj.id}/`
    
    return this.http.put(url, obj, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  /** 削除 */
  delete(id: number): Observable<any> {
    httpOptions.headers = httpOptions.headers.set('Authorization', 'JWT ' + this.token);
    return this.http.delete(`${this.url}${id}/`, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  /** HeroServiceのメッセージをMessageServiceを使って記録 */
  private log(message: string) {
    console.log(`TodoService: ${message}`);
  }

  login(user: string, password: string): Observable<any> {
    console.log('login');
    return this.http.post(this.loginUrl, { username: user, password: password }, { observe: 'response' })
      .pipe(map(
        res => {
          // let user = res.json();
          let token = res.body['token']
          // if (user && user.token) {
          localStorage.setItem('auth_angular_user', JSON.stringify(token));
          this.token = token
        }
    ))
  }
  logout() {
    localStorage.removeItem('auth_angular_user');
    this.token = null;
  }
  
  isLogin() {
    if (localStorage.getItem('auth_angular_user')) {
      const token = JSON.parse(localStorage.getItem('auth_angular_user'));
      console.log('logined token ' + token);
      console.log(token);
      httpOptions.headers = httpOptions.headers.set('Authorization', 'JWT ' + token);
    } else {
        throw new AppError.Unauthorized(null, null);           
      // this.router.navigate(['/login/']);
    }
  }    
  private handleError(error: HttpErrorResponse) {
    const err = AppError.ApiErrorFactory.getError(error);
    throw err;
    return throwError(error);
  }
  makeHttpHeader(){
    return 
  }    
}

export namespace AppError {

  export function isInstance(error: BaseError, clazz: BaseError) {
    return error.name && error.name === clazz.name;
  }

  export class BaseError extends Error {
    constructor(message?: string, error?: Error) {
      super(message);
      this.name = 'AppError.BaseError';
      this.message = message;
      if (error) {
        this.stack += `\nCaused by: ${error.message}`;
        if (error.stack) {
          this.stack += `\n${error.stack}`;
        }
      }
    }
  }

  export class ApiError extends BaseError {
    private response: HttpResponseBase;

    constructor(message?: string, response?: HttpResponseBase, error?: Error) {
      super(message, error);
      this.name = 'ApiError';
      this.response = response;
    }
  }

  export class BadRequest extends ApiError {
    constructor(message?: string, response?: HttpResponseBase, error?: Error) {
      super(message, response);
      this.name = 'BadRequest';
    }
  }

  export class Unauthorized extends ApiError {
    constructor(message?: string, response?: HttpResponseBase, error?: Error) {
      super(message, response);
      this.name = 'Unauthorized';
    }
  }

  export class Forbidden extends ApiError {
    constructor(message?: string, response?: HttpResponseBase, error?: Error) {
      super(message, response);
      this.name = 'Unauthorized';
    }
  }

  export class ApiErrorFactory {
    public static getError(res: HttpResponseBase): ApiError {
      let error: ApiError = null;
      switch (res.status) {
        case 400:
          error = new AppError.BadRequest(null, res);
          break;
        case 401:
          error = new AppError.Unauthorized(null, res);
          break;
        case 403:
          error = new AppError.Forbidden(null, res);
          break;
      }
      return error;
    }
  }  
}