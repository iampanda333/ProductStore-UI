import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient, private router: Router) { }
  isAdmin = false;
  loggedIn = false;
  message = '';

  signUp(credentials) {
    this.http.post('http://localhost:3000/signup', credentials).subscribe((data) => {

      if (data['success']) {
        this.router.navigate(['/login']);
        this.message = 'User is created';
      } else {
        this.message = 'Error occured';
      }
    }, (err) => {
      this.message = 'Error occured';
    });
  }

  logIn(credentials) {
    this.http.post('http://localhost:3000/signin', credentials).subscribe((data) => {

      if (data['success']) {
        this.router.navigate(['/product']);
        this.loggedIn = true;
        this.setSession(data['token']);
        if (data['user']['isAdmin']) {
          this.isAdmin = true;
        }
      } else {
        this.message = 'Error occured';
      }
    }, (err) => {
      this.message = 'Error occured';
    });
  }

  private setSession(token) {
    localStorage.setItem('id_token', token);
  }

  logout() {
    localStorage.removeItem("id_token");
    this.isAdmin = false;
    this.loggedIn = false;
    this.message = '';
  }

  getAllUsers() {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('id_token')
      })
    };
    return this.http.get('http://localhost:3000/users', httpOptions);
  }

  deleteUser(userId) {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('id_token')
      })
    };
    return this.http.delete(`http://localhost:3000/users/${userId}`, httpOptions);
  }

  authenticateUser(userDetails) {
    if (userDetails) {

    }

  }
  userList = [
    {
      name: "Dibyajyoti"
    },
    {
      name: "Dibyajyoti2"
    },
    {
      name: "Dibyajyoti22"
    }, {
      name: "Dibyajyoti3"
    }, {
      name: "Dibyajyoti4"
    }, {
      name: "Dibyajyoti5"
    }, {
      name: "Dibyajyoti6"
    }
  ]

}
