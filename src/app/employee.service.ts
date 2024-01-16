import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Emp } from './emp';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
API_BASE_PATH:string='http://localhost:4200/api/'
  constructor(private hc:HttpClient) { }
  getAllEmployess(){
    return this.hc.get(this.API_BASE_PATH+"Employee")
  }
  getEmployee(empId:number){
    return this.hc.get(`${this.API_BASE_PATH}Employee/${empId}`)
  }
addEmployee(empObj:Emp){
return this.hc.post(`${this.API_BASE_PATH}Employee`,empObj)
}
updateEmployee(empObj:Emp){
  return this.hc.put(`${this.API_BASE_PATH}Employee${empObj.id}`,empObj)
  }

  deleteEmployee(id:number){
    return this.hc.delete(`${this.API_BASE_PATH}Employee/${id}`)
  }

}
