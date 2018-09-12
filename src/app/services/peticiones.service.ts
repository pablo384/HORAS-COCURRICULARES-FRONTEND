
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
  //=======================================| CARRERA |=====================
  crearCarrera(data: Object): Observable<any> {
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + '/carrera',JSON.stringify(data))
  }

  GetAllCarrera(): Observable<any> {
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + '/carrera')
  }

  //=======================================| ACTIVIDAD |=====================
  crearActividad(data: Object): Observable<any> {
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + '/actividad',JSON.stringify(data))
  }

  GetActividades(fecha1: string,fecha2): Observable<any> {
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + '/actividad/por_fecha/'+fecha1+'/'+fecha2)
    // return this.http.get(this.url + '/actividad')
  }
  //=======================================| ESTUDIANTE |=====================
  crearEstudiante(data: Object): Observable<any> {
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + '/usuario',JSON.stringify(data))
  }
  //=======================================| ESTUDIANTE |=====================
  crearConferencia(data: Object): Observable<any> {
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + '/conferencia',JSON.stringify(data))
  } 

  GetConferencistas(): Observable<any> {
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + '/persona/conferencistas')
  }

  GetAllVerificadores(): Observable<any> {
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + '/usuario/verificadores')
  }

  GetConferenciasPorActividad(actividad): Observable<any> {
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + '/conferencia/por_actividad/'+actividad)
  }

  GetConferenciasDeHoy(): Observable<any> {
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + '/conferencia/para_hoy')
  }

  //=======================================| ESTUDIANTE |=====================
  ActualizarEstudiante(data: Object): Observable<any> {
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.patch(this.url + '/usuario',JSON.stringify(data))
  }

}
