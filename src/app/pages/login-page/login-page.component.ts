import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from "../../core/authentication/authentication.service"

declare const gapi: any;

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPage implements OnInit, AfterViewInit {

  /*form:FormGroup;

  constructor(private fb:FormBuilder/*, private authService: AuthService,
              private router: Router) {

    this.form = this.fb.group({
      email: [''],
      password: ['']
    });
  }*/

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    gapi.signin2.render('signin-with-google', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': param => this.authService.onSignInWithGoogle(param)
    });
  }

  /*authenticate() {
    const val = this.form.value;

    if (val.email && val.password) {
      console.log("login is valid");
    }
    alert("Not yet implemented.");
  }*/

  /*onSignInWithGoogle(googleUser:any) {
    this.authService.onSignInWithGoogle(googleUser)
  }*/

}
