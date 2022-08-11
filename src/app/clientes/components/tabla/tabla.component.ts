import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from '../../interfaces/cliente.interface';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styles: [
  ]
})
export class TablaComponent {

  @Input() clientes: Cliente[] = [];

  constructor( private clientesService: ClientesService ) { }

  borrarCliente( id?: string ) {
    this.clientesService.eliminarCliente( id ).subscribe(
      _ => this.clientes = this.clientesService.clientes
    );
  }

}
