import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly APP_USER = 'APP_USER';

  constructor() { }

  storeUser(usuario: Usuario) {    
    localStorage.setItem(this.APP_USER, JSON.stringify(usuario))
  }
}
