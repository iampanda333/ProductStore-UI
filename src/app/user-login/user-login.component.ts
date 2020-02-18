import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from 'src/services/login/login-service.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})

export class UserLoginComponent implements OnInit {
  routerUrl;
  form: FormGroup;
  isSubmitted = false;
  message;

  constructor(private router: Router, private fb: FormBuilder, private loginService: LoginServiceService) { }

  ngOnInit() {
    this.routerUrl = this.router.url === '/login' ? 'Log In' : 'Sign Up';
    this.message = this.loginService.message;
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formControls() { return this.form.controls; }
  
  login() {
    if (this.routerUrl === 'Log In') {
      this.loginService.logIn(this.form.value);
    } else {
      this.loginService.signUp(this.form.value);
    }
    this.form.reset();
  }

}
