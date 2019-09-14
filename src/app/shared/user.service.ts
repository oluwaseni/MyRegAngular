import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly baseURI = 'http://localhost:49755/API';
 
  element: any={}
  constructor(private fb: FormBuilder, private http:HttpClient) { }

  formModel?:any = this.fb.group({
    username: ['', Validators.required],
    Email: ['', Validators.email],
    Fullname: [''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required],
    },
    {Validator : this.comparePasswords})
   
  });

  comparePasswords(fb: FormGroup){
    let ConfirmPswdCtrl = fb.get('ConfirmPassword');

    if(ConfirmPswdCtrl.errors == null || 'passwordMismatch' in ConfirmPswdCtrl.errors){
      if(fb.get('Password').value!= ConfirmPswdCtrl.value)
      ConfirmPswdCtrl.setErrors({passwordMismatch: true});
      else ConfirmPswdCtrl.setErrors(null)
    }
  }


  registration(){
    var body= {
      UserName: this.formModel.value.username,
      Email: this.formModel.value.email,
      Fullname: this.formModel.value.Fullname,
      Password: this.formModel.value.Passwords.Password
    };


    return this.http.post(this.baseURI+'/ApplicationUser/Register', body);
  }

  
  Adminregistration(){
    var body= {
      UserName: this.formModel.value.username,
      Email: this.formModel.value.email,
      Fullname: this.formModel.value.Fullname,
      Password: this.formModel.value.Passwords.Password
    };


    return this.http.post(this.baseURI+'/ApplicationUser/AdminRegister', body);
  }

  login(formData){
    return this.http.post(this.baseURI+'/ApplicationUser/Login', formData);

  }

  getUserProfile(){

    // var tokenHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})
    return this.http.get(this.baseURI+'/UserProfile'); // ,{headers : tokenHeader}
  }

  roleMatch(allowedRoles): boolean{
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;

    allowedRoles.forEach(element => {
      if(userRole == element){
        isMatch = true;
        return false;
      }
      
    });


    return isMatch;
  }
}
