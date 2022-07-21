import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Persona{
  nombre: string;
  favoritos:Favoritos[]
}
interface Favoritos{
  nombre: string;
  id: number;
}
@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent  {

  nuevoJuego:string ='';
  persona:Persona = {nombre:'Julio',favoritos:[{id:1,nombre:'Metal Slug'},{id:2,nombre:'Super Mario'}]}

  @ViewChild('miFormulario') miFormulario!:NgForm;

  guardar(){
    console.log('Formulario posteado')
  }
  nombreValido(){
    return this.miFormulario?.controls['nombre']?.errors
            && this.miFormulario?.controls['nombre']?.touched;
  }

  agregar(){
    const nuevoFavorito:Favoritos = {id:this.persona.favoritos.length+1,nombre:this.nuevoJuego};
    this.persona.favoritos.push({...nuevoFavorito});
    this.nuevoJuego = '';
  }

  eliminar(index:number){
    this.persona.favoritos.splice(index,1);
  }
}
