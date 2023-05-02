import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private users = [
    { username: 'admin', password: '1234', roles: ['ADMIN', 'USER'] },
    { username: 'user1', password: '1234', roles: ['USER'] },
    { username: 'user2', password: '1234', roles: ['USER'] }
  ];

  public isAuthenticated: boolean;
  public userAuthenticated: any;
  public token: string;

  constructor() { }

  public login(username: string, password: string) {
    let user;
    this.users.forEach(u => {
      if (u.username == username && u.password == password) {
        user = u;
        //btoa permet d'encoder coté client en base 64
        this.token = btoa(JSON.stringify({ username: u.username, roles: u.roles }));
      }
    });
    if (user) {
      this.isAuthenticated = true;
      this.userAuthenticated = user;
    } else {
      this.isAuthenticated = false;
      this.userAuthenticated = undefined;
    }
  }

  public isAdmin() {
    if (this.userAuthenticated.roles.indexOf('ADMIN') > -1) {
      return true;
    }
    return false;
  }

  public saveAuthenticatedUser() {
    if (this.userAuthenticated) {
      localStorage.setItem('authToken', this.token);
    }
  }

  public loadAuthenticatedUserFromLocalStorage() {
    let t = localStorage.getItem('authToken');
    if (t) {
      //atob permet l'opération inverse de btoa, donc décode
      let user = JSON.parse(atob(t));
      this.userAuthenticated = { username: user.username, roles: user.roles };
      this.isAuthenticated = true;
      this.token=t;
    }
  }

  public removeTokenFromLocalStorage(){
    localStorage.removeItem('authToken');
    this.isAuthenticated=false;
    this.token;
    this.userAuthenticated=undefined;
  }
}
