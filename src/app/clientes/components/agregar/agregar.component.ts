import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2'

import { ValidatorService } from '../../services/validator.service';
import { ClientesService } from '../../services/clientes.service';
import { NuevoCliente } from '../../interfaces/nuevoCliente.interface';
import { Cliente } from '../../interfaces/cliente.interface';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent implements OnInit {

  public id: string = 'modalAgregar';

  agregarForm: FormGroup = this.fb.group({
    dni      : ['', [ 
      Validators.required, 
      this.validatorService.dniValido, ( control: FormControl ) => this.validatorService.dniYaRegistrado( control, this.clientesService.clientes, this.id ) 
    ]],
    nombre   : ['', [ Validators.required ] ],
    apellido1: [''],
    apellido2: [''],
    email    : ['', [ Validators.required, Validators.pattern( this.validatorService.emailPattern ) ] ],
    fecha_nacimiento: [''],
    departamento: [''],

  });

  constructor( private fb: FormBuilder,
               private validatorService: ValidatorService,
               private clientesService: ClientesService ) { }

  @ViewChild('modal') modal?: ElementRef;

  @Input() cliente?: Cliente;

  ngOnInit(): void {
    if ( this.cliente ) {
      this.id = this.cliente!.id ?? 'modalAgregar';
      this.agregarForm.reset({
        dni: this.cliente?.dni,
        nombre: this.cliente?.nombre,
        apellido1: this.cliente.apellido1,
        apellido2: this.cliente.apellido2,
        email: this.cliente?.email,
        fecha_nacimiento: this.cliente?.fecha_nacimiento,
        departamento: this.cliente?.departamento
      });
  
    } else {
      this.reset(); 
    }
        
  }
  
  get textErrorDni(): string {

    const errors = Object.keys( this.agregarForm.get( 'dni' )?.errors ?? {} );
    if ( errors.includes('required') ) {
      return 'Este campo es requerido';
    } else if ( errors.includes( 'dni_no_valido') ) {
      return 'El DNI introducido no es válido';
    } else {
      return 'El DNI ya está registrado';
    }

  }
  
  tieneError( campo: string ): boolean {
    return ( this.agregarForm.get(campo)?.touched && this.agregarForm.get( campo )?.invalid ) || false;
  }  

  reset() {
    this.agregarForm.reset({ departamento: '' });
  }

  agregarCliente() {
    if (this.agregarForm.invalid) {
      this.agregarForm.markAllAsTouched();
      return;
    }

    let cliente: NuevoCliente;
    let title: string;
    let text: string;
    let titleError: string;
    let textError: string;

    if ( this.id === 'modalAgregar' ) {
      
      cliente    = { ...this.agregarForm.value };
      title      = 'Cliente creado';
      text       = 'Cliente creado correctamente!';
      titleError = 'Error al crear el ciente';
      textError  = 'No se ha podido crear el cliente. Inténtelo de nuevo, si el problema persiste contacte con el administrador';

    } else {

      cliente = { id: this.cliente?.id,  ...this.agregarForm.value };
      title      = 'Cliente actualizado';
      text       = 'Cliente actualizado correctamente!';
      titleError = 'Error al actualizar el ciente';
      textError  = 'No se ha podido actualizar el cliente. Inténtelo de nuevo, si el problema persiste contacte con el administrador';

    }

    this.clientesService.crearCliente( cliente ).subscribe({
      next: _ => {
        Swal.fire({
          icon: 'success',
          title,
          text,
          showConfirmButton: false,
          position: 'top-right',
          timer: 700
        });        
        this.modal?.nativeElement.click();
        this.reset();
      },

      error: _ => {
        Swal.fire({
          icon: 'error',
          title: titleError,
          text: textError,
          showConfirmButton: false,
          position: 'top-right',
          timer: 2500
        });        
      }
    }
    );    
  }

}
