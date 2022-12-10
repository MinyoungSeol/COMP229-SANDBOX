import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../../model/user.model'

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    // user: User
    private authUrl       = 'http://localhost:3201/api/auth' //'https://comp229.sohaibmohiuddin.ca/mean-demo/api/auth'
    private tempAuthUrl   = 'http://143.198.44.14:3201/mean-demo/api/auth' 
    private loginPath     = 'login'
    private registerPath  = 'register'
    private logoutPath    = 'logout'
    private getUser       = 'user'

    constructor(private http : HttpClient) { }

    public isAuthenticated(): Boolean {
        let userData = localStorage.getItem('userInfo')

        if (userData && JSON.parse(userData)) return true
        return false
    }

    public setUserInfo(user: any) {
        localStorage.setItem('userInfo', JSON.stringify(user))
    }

    clearStorage() {
        localStorage.clear();
    }

    public validate(username: string, password: string) {
        return this.http.post(`${ this.authUrl }/${ this.loginPath }`, { 'username': username, 'password': password }, httpOptions)
    }

    public registerUser(user: User) {
        return this.http.post(`${ this.authUrl }/${ this.registerPath }`, user, httpOptions)
    }

    public logoutUser() {
        return this.http.get(`${ this.authUrl }/${ this.logoutPath }`, httpOptions)
    }

    public getUserInfo(): Observable<User> {
        return this.http.get<User>(`${ this.authUrl }/${ this.getUser }`, httpOptions)
    }
}  