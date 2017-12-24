import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPage implements OnInit {


  constructor() { }

  ngOnInit() {
  }

  authenticate() {
    alert("Not yet implemented.");
  }

}
