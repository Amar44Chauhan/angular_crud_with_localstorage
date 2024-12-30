import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModel } from './model/employeeModel';
import { refCount } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  employeeForm!:FormGroup
  empObj:EmployeeModel = new EmployeeModel()
  employeeList:EmployeeModel[] = [];
  
  constructor(){
    debugger
    this.createForm();
    const oldData = localStorage.getItem('empData');
    if(oldData != null){
      const parseData = JSON.parse(oldData);
      this.employeeList = parseData;
    }
  }

  createForm(){
    this.employeeForm = new FormGroup({
      empId:new FormControl(this.empObj.empId),
      name:new FormControl(this.empObj.name,[Validators.required]),
      email:new FormControl(this.empObj.email,[Validators.required]),
      desigination:new FormControl(this.empObj.desigination),
      phoneNumber:new FormControl(this.empObj.phoneNumber),
      address:new FormControl(this.empObj.address),
      pincode:new FormControl(this.empObj.pincode,[Validators.required,Validators.minLength(6)])
    })

  }

  onSave(){
    debugger
    const oldData = localStorage.getItem("empData");
    if(oldData != null){
      const parseData = JSON.parse(oldData);
      this.employeeForm.controls['empId'].setValue(parseData.length +1);
      this.employeeList.unshift(this.employeeForm.value);
    }
    else{
      this.employeeList.unshift(this.employeeForm.value);
    }
    localStorage.setItem('empData',JSON.stringify(this.employeeList));
    this.reset();

  }

  onEdit(item:EmployeeModel){
    this.empObj =item;
    this.createForm();
  }
  OnUpdate(){
    const record = this.employeeList.find(x=>x.empId==this.employeeForm.controls['empId'].value);
    if(record != undefined){
      record.name = this.employeeForm.controls['name'].value
      record.email = this.employeeForm.controls['email'].value
      record.desigination = this.employeeForm.controls['desigination'].value
      record.phoneNumber = this.employeeForm.controls['phoneNumber'].value
      record.address = this.employeeForm.controls['address'].value
      record.pincode = this.employeeForm.controls['pincode'].value
    }
    localStorage.setItem('empdata',JSON.stringify(this.employeeList))
   this.reset();
  }

  onDelete(id:number){
    const isDelete = confirm("Are you sure to delete record")
    if(isDelete){
      const index = this.employeeList.findIndex(x=> x.empId==id);
      this.employeeList.splice(index,1)
    }

  }
  reset(){
    this.empObj = new EmployeeModel()
    this.createForm();
  }
}
