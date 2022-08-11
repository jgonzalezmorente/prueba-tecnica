import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ListadoComponent } from './screens/listado/listado.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TablaComponent } from './components/tabla/tabla.component';
import { AgregarComponent } from './components/agregar/agregar.component';
import { SharedModule } from '../shared/shared.module';
import { DepartamentoPipe } from './pipes/departamento.pipe';


@NgModule({
  declarations: [
    AgregarComponent,
    ListadoComponent,
    TablaComponent,
    DepartamentoPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClientesRoutingModule,
    SharedModule
  ]
})
export class ClientesModule { }
