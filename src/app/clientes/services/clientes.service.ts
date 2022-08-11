import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NuevoCliente } from '../interfaces/nuevoCliente.interface';
import { Cliente } from '../interfaces/cliente.interface';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private _clientes: Cliente[] = [];

  constructor( private http: HttpClient ) { }

  get clientes() {
    // return [ ...this._clientes ];
    return this._clientes;
  }

  crearCliente( nuevoCliente: NuevoCliente ): Observable<string> {
    
    const { id, apellido1, apellido2, departamento, dni, email, fecha_nacimiento, nombre } = nuevoCliente;

    let apellidos = '';
    if ( apellido1 ) {
      apellidos = apellido1;
    }

    if ( apellido2 ) {
      apellidos += ' ' + apellido2;
    }

    const cliente: Cliente = {
      dni,
      nombre,
      apellidos,
      email,
      edad: this._calcularEdad( fecha_nacimiento ),
      departamento,
      fecha_nacimiento,
      apellido1,
      apellido2
    };

    if (!id) {

      return this.http.post<{name: string}>( `${ environment.baseUrl }.json`, cliente ).pipe(
        map( ( { name } ) => name ),
        tap( name => this._clientes.push({ id: name, ...cliente }) )
      );

    } else {

      return this.http.put<Cliente>( `${ environment.baseUrl }/${ id }.json`, cliente ).pipe(
        map( ( _ ) => id ),
        tap( id => { 
          const index = this._clientes.findIndex( cliente => cliente.id === id );
          this._clientes[ index ] = { id, ...cliente };
        })
      );

    }

  }

  _calcularEdad( fecha_nacimiento: string ): string {
    if (!fecha_nacimiento) {
      return '';
    }
    const fechaNacimiento = new Date( fecha_nacimiento );    
    const edad = new Date( Date.now() - fechaNacimiento.getTime() );
    return ( edad.getFullYear() - 1970 ).toString();
  }


  getClientes(): Observable<Cliente[]> {  
    return this.http.get( `${ environment.baseUrl }.json` ).pipe(
      map( ( clientes: any ) => {
        if ( !clientes ) {
          return [];
        }
        const keys = Object.keys( clientes );
        return keys.map( id => ({ id, ...clientes[ id ] }) );
      }),
      tap( clientes => this._clientes = clientes )
    );
  }

  eliminarCliente( id?: string ): Observable<any> {
    if (!id) {
      return of();
    }
    return this.http.delete( `${ environment.baseUrl }/${ id }.json` ).pipe(
      tap( _ => {        
        this._clientes = this._clientes.filter( ( cliente ) => cliente.id != id );        
      })
    );
  }


}
