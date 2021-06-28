import { HttpClient, HttpResponse, HttpResponseBase, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IdValor } from 'src/app/viajes/services/id-valor';
import { Cliente } from '../models/cliente';
import { ClienteListItem } from '../models/cliente-list-item';

@Injectable({
  providedIn: 'root'
})
export class ClientesModelService {

  url = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getAll(): Observable<ClienteListItem[]> {
    return this.http.get<ClienteListItem[]>(`${this.url}/clientes`).pipe(
      map(clientes => clientes.map(x => new ClienteListItem(x))));
  }

  getById(id: string): Observable<Cliente | null> {
    if (!id) {
      return of(null);
    }

    return this.http.get<Cliente>(`${this.url}/clientes/${id}`).pipe(
      map(cliente => new Cliente(cliente))
    );
  }

  save(cliente: Cliente): Observable<Cliente | null> {
    if (!cliente) {
      return of(null);
    }

    return cliente?.id
      ? this.http.put<Cliente>(`${this.url}/clientes/${cliente.id}`, cliente).pipe(
        map(cliente => new Cliente(cliente))
      )
      : this.http.post<Cliente>(`${this.url}/clientes/`, cliente).pipe(
        map(cliente => new Cliente(cliente))
      );
  }

  delete(clienteId: string): Observable<boolean> {
    return clienteId
      ? this.http.delete<HttpResponse<any>>(`${this.url}/clientes/${clienteId}`, { observe: 'response' }).pipe(
        map(res => res.status === HttpStatusCode.NoContent)
      )
      : of(false)
  }

  getEstadosCiviles(): Observable<IdValor[]> {
    //return this.http.get<IdValor[]>(`${this.url}/estadosCiviles`);

    return of([
      { id: 1, valor: 'Soltero' },
      { id: 2, valor: 'Casado' },
      { id: 3, valor: 'Viudo' },
      { id: 4, valor: 'Divorciado' },
    ])
  }
}
