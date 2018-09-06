
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {CONSTANTES} from './CONSTANTES.service';
@Injectable()
export class PeticionesService {
  public url: string;
  constructor(private  http: HttpClient) {
    this.url = "http://"+CONSTANTES.url;
  }

  getResultadosDeSorteos(cFecha:string,token:string) {
    
      return this.http.get(this.url +'')
  } 

  login(data: Object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + '/login',JSON.stringify(data),{headers: headers})
  }

  crearCarrera(data: Object): Observable<any> {
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + '/carrera',JSON.stringify(data))
  }

  GetAllCarrera(): Observable<any> {
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + '/carrera')
  }

  crearActividad(data: Object): Observable<any> {
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + '/actividad',JSON.stringify(data))
  }

  crearEstudiante(data: Object): Observable<any> {
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + '/usuario',JSON.stringify(data))
  }


  GetActividades(fecha1: string,fecha2): Observable<any> {
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + '/actividad/por_fecha/'+fecha1+'/'+fecha2)
    // return this.http.get(this.url + '/actividad')
  }
}
