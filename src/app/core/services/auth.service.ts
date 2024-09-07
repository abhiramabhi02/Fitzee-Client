import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  private adminTokenKey = 'admin'
  private userTokenKey = 'user'
  private trainerTokenKey = 'trainer'

  setToken(token:string, role:string): void {
   localStorage.setItem(role, token)
  }

  getToken(role:string):string | null{
    return localStorage.getItem(role)
  }

  getRole(){
    const key = Object.keys(localStorage)
    return key[0]
  }

  isUser(){
    return localStorage.getItem(this.userTokenKey)
  }

  isTrainer(){
    return localStorage.getItem(this.trainerTokenKey)
  }

  isAdmin(){
    return localStorage.getItem(this.adminTokenKey)
  }

  removeToken(role:string): void{
    localStorage.removeItem(role)
  }
}
