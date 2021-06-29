import { HttpClient, HttpHeaders, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Viaje } from '../models/viaje';
import { IdValor } from './id-valor';
import { map } from 'rxjs/operators';
import { ViajesFilter } from '../models/viajes-filter';
import { AuthService } from 'src/app/services/auth.service';

export interface ViajeDelete {
  destroyedRow: number
  delete: boolean,
  porque?: 'l.fdjafldskjflajflñasjflaksjfñlsdjfl'
}

@Injectable({
  providedIn: 'root'
})
export class ViajesModelService {

  private tiposDeViaje: IdValor[] = [
    { id: 1, valor: 'Familar' },
    { id: 2, valor: 'Trabajo' },
    { id: 3, valor: 'Luna De Miel' },
    { id: 4, valor: 'Ahora Mismo Por Favor' },
    { id: 5, valor: 'Aventura' },
    { id: 6, valor: 'Cultural' },
    { id: 7, valor: 'Luxury' },
    { id: 8, valor: 'Gastronomico' },
  ];

  private url = 'http://localhost:3000';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getViajes(): Observable<Viaje[]> {

    const headers = new HttpHeaders({
      Pepito: `Mi nombre es pepito`
    })

    return this.http.get<Viaje[]>(`${this.url}/viajes`, {
      headers
    }).pipe(
      map(x => x.map(v => new Viaje(v)))
    );

  }

  getViajeById(id: string): Observable<Viaje> {

    return this.http.get<Viaje>(`${this.url}/viajes/${id}`).pipe(
      map(x => new Viaje(x))
    );

  }

  guardar(viaje: Viaje): Observable<Viaje | null> {

    if (!viaje) {
      return of(null);
    }

    if (viaje.id) {
      return this.http.put<Viaje>(`${this.url}/viajes/${viaje.id}`, viaje).pipe(
        map(x => new Viaje(x))
      );
    }

    return this.http.post<Viaje>(`${this.url}/viajes/`, viaje).pipe(
      map(x => new Viaje(x))
    );

  }

  eliminar(id: string): Observable<boolean | null> {

    // Opcion de Victor
    // if (id) {
    //   return this.http.delete<boolean>(`${this.url}/viajes/${id}`)
    //   // .pipe(
    //   //   map(x => x.delete));
    // }

    if (id) {
      return this.http.delete<any>(`${this.url}/viajes/${id}`, { observe: 'response' }).pipe(
        map(x => x.status === HttpStatusCode.Ok));
    }

    return of(null);
  }

  buscar(filtro: ViajesFilter): Observable<Viaje[]> {
    const { nombre, destino, tipoDeViajeId } = filtro;

    // let params = '';

    // if (filtro?.tipoDeViajeId) {
    //   params = `tipoDeViajeId=${tipoDeViajeId}`;
    // }

    // if (filtro?.nombre) {
    //   params = params ? `${params}&nombre=${nombre}` : `nombre=${nombre}`;
    // }

    // if (filtro?.destino) {
    //   params = params ? `${params}&destino=${destino}` : `destino=${destino}`;
    // }

    // return this.http.get<Viaje[]>(`${this.url}/viajes/search?${params}`).pipe(
    //   map(x => x.map(v => new Viaje(v)))
    // );


    let httpP = new HttpParams();

    if (filtro?.tipoDeViajeId) {
      httpP = httpP.set('tipoDeViajeId', tipoDeViajeId);
    }

    if (filtro?.nombre) {
      httpP = httpP.set('nombre', nombre);
    }

    if (filtro?.destino) {
      httpP = httpP.set('destino', destino);
    }

    return this.http.get<Viaje[]>(`${this.url}/viajes/search`, { params: httpP }).pipe(
      map(x => x.map(v => new Viaje(v)))
    );

  }

  getTiposDeViajes(): IdValor[] {
    return this.tiposDeViaje;
  }

}
