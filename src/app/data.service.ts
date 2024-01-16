import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { Emp } from './emp';

@Injectable({
  providedIn: 'root'
})
export class DataService  implements InMemoryDbService{

  constructor() { }
   createDb() {
    let Employee :Emp []=[
      {id:1,department:'Software' ,empName:"Hassan",mobile:1234567890,gender:'male',joinDate:'2024-01-01',email:'mohan@gmail.com ',salary:45000,password:'123456789',empStatus:true},
      {id:2,department:'Software' ,empName:"Hassan",mobile:1234567890,gender:'male',joinDate:'2024-01-01',email:'mohan@gmail.com ',salary:45000,password:'123456789',empStatus:true}
    ];
    return{Employee}
  }
  
}
