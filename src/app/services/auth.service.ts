import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly APP_USER = 'APP_USER';

  constructor() { }

  get isUserAuthenticated(): boolean {
    return localStorage.getItem(this.APP_USER) !== null;
  }

  storeUser(usuario: Usuario): void {
    localStorage.setItem(this.APP_USER, JSON.stringify(usuario))
  }

  logOutUser(): void {
    localStorage.removeItem(this.APP_USER);
  }
}
