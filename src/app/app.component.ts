import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/services/login/login-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public _login: LoginServiceService) { }

  logout() {
    this._login.loggedIn = false
  }
}
