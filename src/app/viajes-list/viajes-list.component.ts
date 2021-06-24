import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Viaje } from '../models/viaje';
import { ViajesFilter } from '../models/viajes-filter';
import { IdValor } from '../services/id-valor';

@Component({
  selector: 'app-viajes-list',
  templateUrl: './viajes-list.component.html',
  styleUrls: ['./viajes-list.component.scss']
})
export class ViajesListComponent implements OnInit {

  @Input() tiposDeViaje: IdValor[] = [];
  @Input() viajes: Viaje[] = [];
  @Output() editar = new EventEmitter<string>();
  @Output() borrar = new EventEmitter<string>();
  @Output() search = new EventEmitter<ViajesFilter>();

  mostrarTarjetas = false;

  constructor() { }

  ngOnInit(): void {
  }

  cambiarVistaClick() {
    this.mostrarTarjetas = !this.mostrarTarjetas;
  }
}
