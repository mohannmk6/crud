import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from './employee.service';
import { Emp } from './emp';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { DBOperation } from './config';
import { NgClass, NgStyle } from '@angular/common';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  implements OnInit  {
  term:string='';
  display="white";
  disableMessage = false;
  operation:DBOperation;
  buttonText:string="Save";
  constructor(private fb:FormBuilder,private empservice:EmployeeService,private toastr:ToastrService) {

  }
EmployeeForm:FormGroup=new FormGroup({})
employees:Emp []=[]
  ngOnInit(): void {
    this.setEmployeeForm();
    this.allEmployee();
  }
  setEmployeeForm(){
    this.operation=DBOperation.create;
    this.buttonText='Save';
    this.EmployeeForm=this.fb.group({
      id:[0],
      department:['',Validators.required],
      empName:['',Validators.required],
      mobile:['',Validators.required],
      gender:['',Validators.required],
      joinDate:['',Validators.required],
      email:['',Validators.required],
      salary:['',Validators.required],
      password:['',Validators.required],
      confirmPass:['',Validators.required],
      empStatus:[false,Validators.requiredTrue],

    })
  }
  formsubmit(){
    console.log(this.EmployeeForm.value)
    if(this.EmployeeForm.valid)
    {
     
return;
    }

    switch(this.operation)
    {
      case DBOperation.create:
        this.empservice.addEmployee(this.EmployeeForm.value).subscribe(res=>{
          this.toastr.success("Employee Added Successfully","Employee Registration");
          this.allEmployee();
          this.resetbtn();
        })
      break;
      case DBOperation.update:
        this.empservice.updateEmployee(this.EmployeeForm.value).subscribe(res=>{
          this.toastr.success("Employee Updated Successfully","Employee Registration");
          this.allEmployee();
          this.resetbtn();
        })
break;
    }
  }
  resetbtn(){
    this.EmployeeForm.reset()
    this.buttonText="Save";
  }
  cancelbtn(){
    this.EmployeeForm.reset();
    this.buttonText="Save";
  }
  allEmployee(){
this.empservice.getAllEmployess().subscribe((res:Emp[])=>{
this.employees=res
    })
  }
  editData(empId:number){
    this.buttonText='Update';
    this.operation=DBOperation.update;
   let empdata=this.employees.find((e:Emp)=>e.id == empId) ;
   this.EmployeeForm.patchValue(empdata)
  }
  showData(empId:number){
    this.display="displayText";
    // textBox.style.backgroundColor = "lightblue"
    this.disableMessage = true;
    let empdata=this.employees.find((e:Emp)=>e.id == empId);
    this.EmployeeForm.patchValue(empdata);
  
  }
  deleteData(empId:number)
  {
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger"
  },
  buttonsStyling: false
});
swalWithBootstrapButtons.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Yes, delete it!",
  cancelButtonText: "No, cancel!",
  reverseButtons: true
}).then((result) => {
  this.empservice.deleteEmployee(empId).subscribe((data)=>{
    this.allEmployee();
    this.toastr.success('Employee Registration','data will Deleted sucessfully!!!!!');
  })
  if (result.isConfirmed) {
    swalWithBootstrapButtons.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  } else if (
    /* Read more about handling dismissals below */
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire({
      title: "Cancelled",
      text: "Your imaginary file is safe :)",
      icon: "error"
    });
  }
});
  }
}
