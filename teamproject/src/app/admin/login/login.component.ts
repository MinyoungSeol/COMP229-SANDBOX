import { Component, OnInit } from '@angular/core';
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

  login() {
    this.authService.validate(this.username, this.password).subscribe((user) => {
      // this.user = user
      this.authService.setUserInfo(user)
      this.router.navigate([''])
    }, (error) => {
      console.log(`Error Login: ${ error }`)
    })
  }

  register(){
    this.router.navigate(['register'])
  }

  getUserInfo() {
    this.authService.getUserInfo().subscribe((user) => this.user = user)
  }

}
