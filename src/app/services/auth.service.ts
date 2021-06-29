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

  get bearer(): string {

    const b = localStorage.getItem(this.APP_USER);

    if (b) {
      const user: Usuario = JSON.parse(b);
      return user.bearer;
    }

    return '';
  }

  storeUser(usuario: Usuario): void {
    localStorage.setItem(this.APP_USER, JSON.stringify(usuario))
  }

  logOutUser(): void {
    localStorage.removeItem(this.APP_USER);
  }


}
