import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() cerrarSesion = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  cerrarSesionClick(): void {
    if (confirm('¿ Seguro que desea cerrar la sesión ?')) {
      this.cerrarSesion.emit();
    }
  }
}
