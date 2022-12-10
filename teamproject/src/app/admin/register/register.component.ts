import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string = ''
  password: string = ''
  email: string = ''
  displayName: string = ''

  user: User = {
    username: this.username,
    password: this.password,
    email: this.email,
    displayName: this.displayName
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  registerForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    displayname: new FormControl("", [Validators.required])
  });

  registerSubmited() {
    console.log(this.registerForm)
  };

  get UserName(): FormControl {
    return this.registerForm.get("username") as FormControl;
  }
  get Password(): FormControl {
    return this.registerForm.get("password") as FormControl;
  }
  get Email(): FormControl {
    return this.registerForm.get("email") as FormControl;
  }
  get DisplayName(): FormControl {
    return this.registerForm.get("displayname") as FormControl;
  }

  register() {
    // this.user = {
    //   username: this.username,
    //   password: this.password,
    //   email: this.email,
    //   displayName: this.displayName
    // }

    // this.authService.registerUser(this.user).subscribe(() => {
    //   console.log(`user registration success: ${ this.user }`)
    this.router.navigate(['login'])
    // }, (error) => {
    //   console.log(`Error: ${ error }`)
    // })
  }

}
