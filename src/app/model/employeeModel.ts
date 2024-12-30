export class EmployeeModel{
    empId:number;
    name:string;
    email:string;
    phoneNumber:string;
    desigination:string;
    address:string;
    pincode:number;

    /**
     *
     */
    constructor() {
       this.empId=1;
       this.name='';
       this.desigination='';
       this.email='';
       this.phoneNumber='';
       this.address='';
       this.pincode=0;
        
    }
    
}