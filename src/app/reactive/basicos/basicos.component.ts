import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: [ , [Validators.required,Validators.minLength(3)] ],
    precio: [ , [Validators.required, Validators.min(0)] ],
    existencias: [ , [Validators.required, Validators.min(0)] ],
  });

  constructor(private fb:FormBuilder) {}

  ngOnInit() {
    this.miFormulario.reset({
      nombre: 'Tarjeta video',
      precio: 1600,
    });
  }
  
  campoValido(campo:string){
    return this.miFormulario.get(campo)?.errors && this.miFormulario.get(campo)?.touched;
  
  }

  guardar(){
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }

}

// miFormulario = new FormGroup({
//   nombre: new FormControl('tarjeta video'),
//   precio: new FormControl(10),
//   existencias: new FormControl(10)
// });