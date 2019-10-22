import { User } from './../../models/user.model';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input()
  enabled = false;

  @Output()
  loggedIn: EventEmitter<User>;

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  // login(email: string, password: string) {
  //   if (email && password) {
  //     this.loggedIn.emit(new User(email, password));
  //   }
  // }
  login() {
    if (this.form.valid) {
      this.loggedIn.emit(
        new User(this.form.value.email, this.form.value.password)
      );
    }
  }
  ngOnInit() {
    // this.authService
    //   .isAuthenticated()
    //   .subscribe(value => (this.isLoggedIn = value));
    // this.authService
    //   .isAuthenticated()
    //   .then((value: boolean) => (this.isLoggedIn = value));

    this.loggedIn = new EventEmitter<User>();
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
}
