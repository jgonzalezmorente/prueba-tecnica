import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'departamento'
})
export class DepartamentoPipe implements PipeTransform {

  transform( value: string ): string {        
    switch (value.toString()) {
      case '1':              
        return 'Administración';
      
      case '2':
        return 'Tienda';

      case '3':
        return 'Contabilidad';
    
      default:
        return '';
    }
  }

}
