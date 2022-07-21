import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';
import { emailPattern } from '../../../shared/validator/validaciones';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.pattern(this.vs.nombrePattern)],],
    email: [, [Validators.required, Validators.pattern(this.vs.emailPattern)], [this.emailV,]],
    username: [, [Validators.required, this.vs.noPuedeserStrider],],
    password: [, [Validators.required, Validators.minLength(6)],],
    password2: [, [Validators.required,],],
  }, {
    validators: [this.vs.camposIguales('password', 'password2')]
  });

  get emailMsgError():string {
    const errors = this.miFormulario.get('email')?.errors;
    if (errors?.['required']) {
      return 'El email es requerido';
    }else if (errors?.['pattern']) {
      return 'El email no es valido';
    }else if (errors?.['emailTomado']) {
      return 'El email ya esta tomado';
    }
    return '';
   }

  constructor(private fb: FormBuilder, private vs: ValidatorService, private emailV: EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset(
      { nombre: 'Julio Rodrigo', email: 'test1@test.com', username: 'julioRL', password: '123456', password2: '123456' }
    );
  }
  validar(campo: string) {
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched;
  }
  crear() {
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }



}
