import { Component, OnInit } from '@angular/core';
import { ClienteListItem } from '../models/cliente-list-item';
import { ClientesModelService } from '../services/clientes-model.service';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.scss']
})
export class ClientesListComponent implements OnInit {

  clientes: ClienteListItem[] = [];

  constructor(private clientesModel: ClientesModelService) { }

  ngOnInit(): void {
    this.clientesModel.getAll().subscribe(clientes => {
      console.log(clientes);
      this.clientes = clientes;
    })
  }

  borrarClick(id: string): void {

  }

  editarClick(id: string): void {

  }

}
