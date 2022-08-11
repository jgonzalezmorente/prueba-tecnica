import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../interfaces/cliente.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
  ]
})
export class ListadoComponent implements OnInit {

  public clientes: Cliente[] = this.clientesService.clientes;

  constructor( private clientesService: ClientesService ) { }

  ngOnInit(): void {
    this.clientesService.getClientes().subscribe( clientes => this.clientes = clientes );
  }

}
