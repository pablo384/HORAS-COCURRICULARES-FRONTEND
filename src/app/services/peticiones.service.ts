
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

    return this.http.post(this.url + '/carrera',JSON.stringify(data))
  }

  GetAllCarrera(): Observable<any> {

    return this.http.get(this.url + '/carrera')
  }

  //=======================================| ACTIVIDAD |=====================
  crearActividad(data: Object): Observable<any> {

    return this.http.post(this.url + '/actividad',JSON.stringify(data))
  }
  //=======================================| ACTIVIDAD |=====================
  crearAsistencia(data: Object): Observable<any> {

    return this.http.post(this.url + '/asistencia/new',JSON.stringify(data))
  }

  GetActividades(fecha1: string,fecha2): Observable<any> {

    return this.http.get(this.url + '/actividad/por_fecha/'+fecha1+'/'+fecha2)
    // return this.http.get(this.url + '/actividad')
  }
  //=======================================| ESTUDIANTE |=====================
  crearEstudiante(data: Object): Observable<any> {

    return this.http.post(this.url + '/usuario',JSON.stringify(data))
  }
  //=======================================| ESTUDIANTE |=====================
  crearConferencia(data: Object): Observable<any> {

    return this.http.post(this.url + '/conferencia',JSON.stringify(data))
  } 

  //=======================================| ESTUDIANTE |=====================
  verificarParticipacion(data: Object): Observable<any> {

    return this.http.post(this.url + '/asistencia/verificar_participacion',JSON.stringify(data))
  } 

  GetConferencistas(): Observable<any> {

    return this.http.get(this.url + '/persona/conferencistas')
  }

  GetCarrera(id): Observable<any> {

    return this.http.get(this.url + '/carrera/'+id)
  }

  GetConferencista(id): Observable<any> {

    return this.http.get(this.url + '/persona/conferencista/'+id)
  }

  GetAllVerificadores(): Observable<any> {

    return this.http.get(this.url + '/usuario/verificadores')
  }

  GetVerifidor(id): Observable<any> {
    return this.http.get(this.url + '/usuario/verificador/'+id)
  }

  GetConferenciasPorActividad(actividad): Observable<any> {

    return this.http.get(this.url + '/conferencia/por_actividad/'+actividad)
  }

  GetConferenciasDeHoy(): Observable<any> {

    return this.http.get(this.url + '/conferencia/para_hoy')
  }

  GetEstudiantesPorConferencias(id_conferencia): Observable<any> {

    return this.http.get(this.url + '/conferencia/lista_estudiantes/'+id_conferencia)
  }


  ConferenciaTerminarOIniciar(id,iniciar:boolean=false): Observable<any> {
    let uri = '/conferencia/iniciar/'
    if (iniciar){
      uri = '/conferencia/finalizar/'
    }
    return this.http.get(this.url + uri+id)
  }

  //=======================================| ESTUDIANTE |=====================
  ActualizarEstudiante(data: Object): Observable<any> {

    return this.http.patch(this.url + '/usuario',JSON.stringify(data))
  }

  //=======================================| ESTUDIANTE |=====================
  ActualizarVerificador(data: Object,id): Observable<any> {

    return this.http.patch(this.url + '/persona/verificador/'+id,JSON.stringify(data))
  }
  //=======================================| ESTUDIANTE |=====================
  ActualizarCarrera(data: Object,id): Observable<any> {

    return this.http.patch(this.url + '/carrera/'+id,JSON.stringify(data))
  }

   //=======================================| ESTUDIANTE |=====================
  ActualizarConferencista(data: Object,id): Observable<any> {

    return this.http.patch(this.url + '/persona/conferencista/'+id,JSON.stringify(data))
  }
}
