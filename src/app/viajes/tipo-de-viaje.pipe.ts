import { Pipe, PipeTransform } from '@angular/core';
import { TipoDeViaje } from './models/enums/tipo-de-viaje.enum';
import { ViajesModelService } from './services/viajes-model.service';

@Pipe({
  name: 'tipoDeViaje'
})
export class TipoDeViajePipe implements PipeTransform {

  constructor(private viajesModelService: ViajesModelService) {
  }

  transform2(tipoDeViajeId: number): string {
    switch (tipoDeViajeId) {
      case TipoDeViaje.Familiar:
        return 'Para todos los publicos';
      default:
        return '';
    }
  }

  transform(tipoDeViajeId: number | null): string {

    if (!tipoDeViajeId){
      return '- - -';
    }

    const tiposViajes = this.viajesModelService.getTiposDeViajes();
    const v = tiposViajes.find(x => x.id === tipoDeViajeId)?.valor;

    return v ? v : ' - - - ';
  }
  
}
