import { Component, OnInit } from '@angular/core';
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
