import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of,combineLatest } from 'rxjs';
import { PaisSmall, Pais } from '../interfaces/paises.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaisesServiceService {

  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  private baseUrl: string = 'https://restcountries.com/v2';

  get regiones(): string[] {
    return [...this._regiones];
  }
  constructor(private http: HttpClient) { }

  getPaisesPorRegion(region: string): Observable<PaisSmall[]> {
    const url: string = `${this.baseUrl}/region/${region}?fields=alpha3Code,name`;
    return this.http.get<PaisSmall[]>(url);
  }

  getPaisPorAlpha(code: string): Observable<Pais | null> {
    if (!code) {
      return of(null);
    }
    const url: string = `${this.baseUrl}/alpha/${code}`;
    return this.http.get<Pais>(url);
  }

  getPaisPorCodeSmall(code: string): Observable<PaisSmall> {
    const url: string = `${this.baseUrl}/alpha/${code}?fields=alpha3Code,name`;
    return this.http.get<Pais>(url);
  }

  getPaisesPorBordes(borders: string[]): Observable<PaisSmall[]> {
    if (!borders) { return of([]) }
    const peticiones: Observable<PaisSmall>[] = [];
    borders.forEach(codigo => {
      peticiones.push(this.getPaisPorCodeSmall(codigo));
    });
    return combineLatest( peticiones );
  }
}
