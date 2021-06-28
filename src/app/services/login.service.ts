import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Usuario } from '../models/usuario';

/**
 * Este servicio sabe como gestionar con la API 
 * si el usuario tiene acceso a la aplicacion
 */
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = 'http://localhost:3000/login';

  constructor(private http: HttpClient) { }

  login(values: { email: string, password: string }): Observable<Usuario | null> {
    // return this.http.post<Usuario>(this.url, values).pipe(
    //   map(u => new Usuario(u))
    // );

    return this.http.post<Usuario>(this.url, values, { observe: 'response' }).pipe(
      map(u => {
        return new Usuario(u.body)
      }),
      catchError((e: HttpErrorResponse) => {
        if (e.status === HttpStatusCode.InternalServerError){
            console.log('La api ha muerto');          
        }
        console.log(e.message);        
        return of(null);
      })
    );
  }
}
