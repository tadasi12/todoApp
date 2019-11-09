import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { GenericService } from '../generic.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService extends GenericService {
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( public http: HttpClient ) {
    super(http, 'todo');
    
   }
}
