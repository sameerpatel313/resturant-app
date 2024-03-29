import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  
  constructor(private _http: HttpClient, private _formBuilder: FormBuilder, private _router: Router)  { }
  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: [''],
      password: ['']
    })
  }
  //login method define
  login() {
     this._http.get<any>("http://localhost:3000/signup").subscribe(res=>{
      const user= res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if(user){
        alert("login successfully");
        this.loginForm.reset();
        this._router.navigate(['restaurent-dash'])
      }else{
        alert("User Not Found !!")
      }
     }, (_err?:any)=>{
      alert("wrong with server side")
     }
     )
    //   .subscribe(res => {
    //     const user = res.find((a: any) => {
    //       return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
    //     })
    //     if (user) {
    //       alert("Login is Successfull");
    //       this.loginForm.reset();
    //       this._router.navigate(['restaurant-dash'])
    //     } else {
    //       alert("User Not Found !! 😡");
    //     }
    //   }, _err => {
    //     alert("Bhir se Galat hai server side se ☹")
    //   }
    //   )
  }
}
