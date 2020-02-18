import { Component, OnInit } from '@angular/core';
import { UserLoginComponent } from '../user-login/user-login.component';
import { LoginServiceService } from 'src/services/login/login-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userList;
  constructor(private loginService: LoginServiceService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loginService.getAllUsers().subscribe((data) => {
      if (data['success']) {
        this.userList = data['data'];
      } else {
        this.userList = [];
      }
    }, (err) => {
      this.userList = [];
    })
  }

  deleteUser(userId) {
    this.loginService.deleteUser(userId).subscribe((data) => {
      if(data['success']) {
        this.loadData();
      }
    })
  }
}
