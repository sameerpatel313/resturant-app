import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup
  constructor(private _router: Router, private _formBuilder: FormBuilder, private _http: HttpClient) { }
  ngOnInit(): void {
    this.signupForm = this._formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      password: ['']
    })
  }
  //make method to create user
  signUp() {
    this._http.post<any>("http://localhost:3000/signup", this.signupForm.value)
      .subscribe(res => {
        alert("Registrain Successfull 👍");
        this.signupForm.reset();
        this._router.navigate(['login'])
      }, err => {
        alert("Kuch Galat Hai Babu bhaiya 🤦‍♀️")
      })
  }
}
