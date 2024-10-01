import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  private adminTokenKey = 'admin';
  private userTokenKey = 'user';
  private trainerTokenKey = 'trainer';

  setToken(token: string, role: string): void {
    localStorage.setItem(role, token);
  }

  getToken(role: string): string | null {
    return localStorage.getItem(role);
  }

  // getRole() {
  //   const key = Object.keys(localStorage);
  //   return key[0];
  // }

  isUser():boolean {
    return localStorage.getItem(this.userTokenKey) !== null;
  }

  isTrainer():boolean {
    return localStorage.getItem(this.trainerTokenKey) !== null;
  }

  isAdmin():boolean {
    return localStorage.getItem(this.adminTokenKey) !== null;
  }

  removeToken(role: string): void {
    localStorage.removeItem(role);
  }

  getUserIdFromToken(user: string): string | null {
    const token = localStorage.getItem(user);
    if (!token) return null;

    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);

    try {
      const decodedJson = JSON.parse(decodedPayload);
      return decodedJson.userId;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
