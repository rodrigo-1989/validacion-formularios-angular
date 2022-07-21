import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  miFormulario:FormGroup = this.fb.group({
    nombre:[ '' , [Validators.required,Validators.minLength(3)] ],
    favoritos:this.fb.array([ 
      ['Metal Slug', Validators.required], 
      ['Metal Slug 2', Validators.required], 
    ],Validators.required),
  });

  nuevoFavorito: FormControl = this.fb.control('',Validators.required );

  constructor(private fb:FormBuilder) { }

  validacion(campo:string){
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

  get favoritosArr(){
    return this.miFormulario.get('favoritos') as FormArray;
  }

  agregarFavorito(){
    if(this.nuevoFavorito.invalid){ return;}
    this.favoritosArr.push( this.fb.control( this.nuevoFavorito.value, Validators.required ) );
    this.nuevoFavorito.reset();
  }

  borrarFavorito(index:number){
    this.favoritosArr.removeAt(index);
  }
}
