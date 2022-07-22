import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesServiceService } from '../../services/paises-service.service';
import { PaisSmall, Pais } from '../../interfaces/paises.interfaces';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
    frontera: ['', Validators.required],
  });

  regiones: string[] = [];
  paises: PaisSmall[] = [];
  fronteras: PaisSmall[] = [];
  cargando: boolean = false;

  constructor(private fb: FormBuilder, private pservice: PaisesServiceService) { }

  ngOnInit(): void {
    this.regiones = this.pservice.regiones;
    this.miFormulario.get('region')?.valueChanges
      .pipe(
        tap((_) => {
          this.miFormulario.get('pais')?.reset('');
          this.cargando = true;
        }),
        switchMap(region => this.pservice.getPaisesPorRegion(region)))
      .subscribe(paises => {
        this.paises = paises;
        this.cargando = false;
      });

    this.miFormulario.get('pais')?.valueChanges
      .pipe( 
        tap( () =>{
           this.miFormulario.get('frontera')?.reset('');
           this.cargando = true;
           }),
        switchMap( code => this.pservice.getPaisPorAlpha( code ) ) ,
        switchMap( pais => this.pservice.getPaisesPorBordes( pais?.borders! ) ) )
      .subscribe( paises => {
        this.fronteras = paises; 
        this.cargando = false;
      });

      
  }

  guardar() {
    console.log(this.miFormulario.value);
  }

}
