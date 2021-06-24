import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TipoDeViaje } from 'src/app/models/enums/tipo-de-viaje.enum';
import { Viaje } from 'src/app/models/viaje';

@Component({
  selector: 'app-viajes-card-list',
  templateUrl: './viajes-card-list.component.html',
  styleUrls: ['./viajes-card-list.component.scss']
})
export class ViajesCardListComponent implements OnInit, OnChanges {

  @Input() viajes: Viaje[] = [];
  viajesCard: Viaje[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {

  }

}
