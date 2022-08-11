import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoComponent } from './screens/listado/listado.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'listado', component: ListadoComponent },      
      { path: '**', redirectTo: 'listado' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
