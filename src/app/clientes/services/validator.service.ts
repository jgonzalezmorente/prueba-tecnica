import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { Cliente } from '../interfaces/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; 
  
  constructor() {}

  dniValido( control: FormControl ): ValidationErrors | null {    
    const valor: string = control.value?.trim();
    if ( !valor ) {
      return null;
    }
    const error = { dni_no_valido: true };

    const dniNumber = Number( valor.slice(0, 8) );
    if ( isNaN( dniNumber ) ) {
      return error;
    }

    const dniLetter = valor.slice( 8, 9 );
    if ( !dniLetter ) {
      return error;
    }

    switch ( dniNumber % 23 ) {
      case 0:
        return ( dniLetter === 'T'  ? null : error );

      case 1:        
        return ( dniLetter === 'R'  ? null : error );

      case 2:
        return ( dniLetter === 'W'  ? null : error );

      case 3:
        return ( dniLetter === 'A'  ? null : error );

      case 4:
        return ( dniLetter === 'G'  ? null : error );        

      case 5:
        return ( dniLetter === 'M'  ? null : error );        

      case 6:
        return ( dniLetter === 'Y'  ? null : error );        

      case 7:
        return ( dniLetter === 'F'  ? null : error );        

      case 8:
        return ( dniLetter === 'P'  ? null : error );        

      case 9:
        return ( dniLetter === 'D'  ? null : error );        

      case 10:
        return ( dniLetter === 'X'  ? null : error );        

      case 11:
        return ( dniLetter === 'B'  ? null : error );        

      case 12:
        return ( dniLetter === 'N'  ? null : error );        

      case 13:
        return ( dniLetter === 'J'  ? null : error );        

      case 14:
        return ( dniLetter === 'Z'  ? null : error );        

      case 15:
        return ( dniLetter === 'S'  ? null : error );        

      case 16:
        return ( dniLetter === 'Q'  ? null : error );        

      case 17:
        return ( dniLetter === 'V'  ? null : error );        

      case 18:
        return ( dniLetter === 'H'  ? null : error );        

      case 19:
        return ( dniLetter === 'L'  ? null : error );        

      case 20:
        return ( dniLetter === 'C'  ? null : error );

      case 21:
        return ( dniLetter === 'K'  ? null : error );        

      case 22:
        return ( dniLetter === 'E'  ? null : error );        

      default:
        return null;
    }
  }

  dniYaRegistrado( control: FormControl, clientes: Cliente[], id_: string ): ValidationErrors | null {

    const valor: string = control.value?.trim();
    const existeDni = clientes.find( ({ id, dni }) => ( dni === valor && id != id_ ) );
    return existeDni ? { 'dni_ya_registrado': true } : null;    

  }

}
