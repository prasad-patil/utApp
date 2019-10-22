import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // loginSubject = new BehaviorSubject(null);
  // constructor() {
  //   this.loginSubject.next(null);
  // }

  // login() {
  //   localStorage.setItem('token', '12334');
  //   this.loginSubject.next(true);
  // }

  // logout() {
  //   localStorage.removeItem('token');
  //   this.loginSubject.next(false);
  // }
  // isAuthenticated() {
  //   return this.loginSubject.asObservable();
  // }

  isAuthenticated() {
    return new Promise((resolve, reject) => {
      resolve(!!localStorage.getItem('token'));
    });
  }
}
