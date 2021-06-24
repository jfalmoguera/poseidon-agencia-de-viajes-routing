import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Viaje } from '../models/viaje';
import { ViajesFilter } from '../models/viajes-filter';
import { IdValor } from '../services/id-valor';
import { ViajesModelService } from '../services/viajes-model.service';

@Component({
  selector: 'app-viajes-list',
  templateUrl: './viajes-list.component.html',
  styleUrls: ['./viajes-list.component.scss']
})
export class ViajesListComponent implements OnInit {

  tiposDeViaje: IdValor[] = [];
  viajes: Viaje[] = [];

  mostrarTarjetas = false;

  constructor(private viajesModel: ViajesModelService, private router: Router) { }

  ngOnInit(): void {
    this.viajesModel.getViajes().subscribe(result => {
      this.viajes = result;
    });
    this.tiposDeViaje = this.viajesModel.getTiposDeViajes();
  }

  cambiarVistaClick() {
    this.mostrarTarjetas = !this.mostrarTarjetas;
  }

  searchClick(filtro: ViajesFilter): void {
    if (filtro) {
      this.viajesModel.buscar(filtro).subscribe(result => {
        this.viajes = result;
      });
    }
  }

  borrarClick(id: string): void {
    if (id && confirm('Esta seguro de querer eliminar el viaje ?')) {
      this.viajesModel.eliminar(id).subscribe(result => {
        this.viajesModel.getViajes().subscribe(result => {
          this.viajes = result;
        });
      })
    }
  }

  editarClick(id: string): void {
    if (id) {
      this.router.navigate(['viajes/editar',id]);
    }
  }
}
