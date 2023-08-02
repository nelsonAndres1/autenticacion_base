import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  public url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8000/api/';
  }

  // Toogle Loggedin
  toggleLogin(state: boolean): void {
    this.isLoggedIn.next(state);
  }

  // Status
  status() {
    const localData: any = localStorage.getItem('user');
    if (!localData) {
      this.isLoggedIn.next(false);
      console.log('User not lgged in !!');
    } else {
      const userObj = JSON.parse(localData);
      const token_expires_at = new Date(userObj.token_expires_at);
      const current_date = new Date();
      if (token_expires_at > current_date) {
        this.isLoggedIn.next(true);
      } else {
        this.isLoggedIn.next(false);
        console.log('Token Expires!!');
      }
    }
    return this.isLoggedIn.asObservable();
  }

  // Login
  login(email: string, password: string) {
    return this.http.post('http://localhost:8000/api/login', {
      email: email,
      password: password,
    });
  }
  getGener14(user: any): Observable<any> {
    return this.http.post('http://localhost:8000/api/getGener14', {});
  }


  getOferta(user: any): Observable<any> {
    return this.http.post('http://localhost:8000/api/getOferta', {});
  }

  // User Info
  user() {
    const user: any = localStorage.getItem('user');
    const userObj = JSON.parse(user);

    const token = userObj.token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get('http://localhost:8000/api/user', {
      headers: headers,
    });
  }

  // Logout
  logout(allDevice: boolean) {
    const user: any = localStorage.getItem('user');
    const userObj = JSON.parse(user);

    const token = userObj.token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post('http://localhost:8000/api/logout', { allDevice: allDevice }, { headers: headers });
  }

  // Register
  register(user: any) {

    let json = JSON.stringify(user);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    console.log("ahahaha");
    console.log(params);
    return this.http.post('http://localhost:8000/api/register', params, { headers: headers });
  }

  // Forgot Pass
  forgot(email: string) {
    return this.http.post('http://localhost:8000/api/forgot', { email: email });
  }

  // Reset Pass
  reset(token: string, password: string, password_confirmation: string) {

    const data = {
      token: token,
      password: password,
      password_confirmation: password_confirmation
    }
    return this.http.post('http://localhost:8000/api/reset', data);
  }
}
