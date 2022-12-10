import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user!: User
  username!: string
  password!: string

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  })

  get UserName(): FormControl {
    return this.loginForm.get("username") as FormControl;
  }
  get Password(): FormControl {
    return this.loginForm.get("password") as FormControl;
  }

  login() {
    this.authService.validate(this.username, this.password).subscribe((user) => {
      // this.user = user
      this.authService.setUserInfo(user)
      this.router.navigate([''])
    }, (error) => {
      console.log(`Error Login: ${error}`)
    })
  }

  register() {
    this.router.navigate(['register'])
  }

  getUserInfo() {
    this.authService.getUserInfo().subscribe((user) => this.user = user)
  }

}
