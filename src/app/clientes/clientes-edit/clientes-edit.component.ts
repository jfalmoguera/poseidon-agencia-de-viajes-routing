import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { formatFecha } from 'src/app/utils/dates-helpers';
import { IdValor } from 'src/app/viajes/services/id-valor';
import { Cliente } from '../models/cliente';
import { ClientesModelService } from '../services/clientes-model.service';

@Component({
  selector: 'app-clientes-edit',
  templateUrl: './clientes-edit.component.html',
  styleUrls: ['./clientes-edit.component.scss']
})
export class ClientesEditComponent implements OnInit {

  clientesForm: FormGroup;
  estadosCivilList: IdValor[] = [];
  submitted = false;
  id: any;

  constructor(private fb: FormBuilder, route: ActivatedRoute, 
    private router: Router,
    private clientesModel: ClientesModelService) {
    this.clientesForm = fb.group({
      id: [''],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', Validators.email],
      dni: [''],
      telefono: [''],
      direccion: [''],
      fechaDeNacimiento: [''],
      estadoCivilId: ['']
    });

    route.params.subscribe(params => {
      this.id = params.id || '';
    });
  }

  ngOnInit(): void {
    if (this.id) {
      this.clientesModel.getById(this.id).subscribe(cliente => {
        if (cliente) {
          this.clientesForm.patchValue(cliente);
          if (cliente.fechaDeNacimiento) {
            const t = formatFecha(cliente.fechaDeNacimiento);
            this.clientesForm.controls.fechaDeNacimiento.setValue(t);
          }
        }
      })
    }

    this.clientesModel.getEstadosCiviles().subscribe(estadosCiviles => {
      this.estadosCivilList = estadosCiviles;
    })

  }

  guardarClick(form: FormGroup): void {

    this.submitted = true;

    // comprobar si el form esta ok
    // enbiar los datos a la api para guardarlos
    // voy a enviar el usuario a la pagina de clientes

    if (form.valid){
      const c: Cliente = form.value;
      if (c.fechaDeNacimiento){
        c.fechaDeNacimiento = new Date(c.fechaDeNacimiento);
      }

      this.clientesModel.save(c).subscribe(cliente => {
        this.router.navigate(['clientes']);
      })
    }
  }

  resetForm(): void {
    this.submitted = false;
    this.clientesForm.reset();
  }
}
