
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CONSTANTES } from './CONSTANTES.service';
@Injectable()
export class PeticionesService {
  public url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://' + CONSTANTES.url;
  }

  getResultadosDeSorteos(cFecha: string, token: string) {
    return this.http.get(this.url + '');
  }

  login(data: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    data.nick = data['usuario'];
    // delete data['usuario'];
    return this.http.post(this.url + '/user/login', JSON.stringify(data), { headers: headers });
  }
  // =======================================| CARRERA |=====================
  crearCarrera(data: any): Observable<any> {
    data.horasRequeridas = data.horas_requeridas;
    return this.http.post(this.url + '/carrera', JSON.stringify(data));
  }

  GetAllCarrera(): Observable<any> {

    return this.http.get(this.url + '/carrera');
  }

  // =======================================| ACTIVIDAD |=====================
  crearCuatrimestre(data: any): Observable<any> {

    return this.http.post(this.url + '/cuatrimestre', JSON.stringify(data));
  }
  // =======================================| ACTIVIDAD |=====================
  crearAsistencia(data: any): Observable<any> {

    return this.http.get(this.url + `/asistencia/ponche?idPersona=${data.idPersona}&idConferencia=${data.idConferencia}`);
  }

  GetAllActividades(): Observable<any> {
    return this.http.get(this.url + '/actividad/reporte_de_asistencia_por_cuatrimestre');
    // return this.http.get(this.url + '/actividad')
  }

  GetCuatrimestres(fecha1: string, fecha2): Observable<any> {
    return this.http.get(this.url + '/cuatrimestre?fechaInicio=' + fecha1 + '&fechaFin=' + fecha2);
    // return this.http.get(this.url + '/actividad')
  }
  // =======================================| ESTUDIANTE |=====================
  crearEstudiante(data: Object): Observable<any> {

    return this.http.post(this.url + '/persona', JSON.stringify(data));
  }
  // =======================================| ESTUDIANTE |=====================
  crearConferencia(data: Object): Observable<any> {

    return this.http.post(this.url + '/conferencia', JSON.stringify(data));
  }
  // =======================================| ESTUDIANTE |=====================
  updateConferencia(data: Object, id): Observable<any> {
    return this.http.patch(this.url + '/conferencia', JSON.stringify(data));
  }
  // =======================================| ESTUDIANTE |=====================
  getConferencia(id): Observable<any> {

    return this.http.get(this.url + '/conferencia/byId?id=' + id);
  }
  getConferenciasParticipadas(id): Observable<any> {
    return this.http.get(this.url + '/persona/getconferenciasparticipadas?id=' + id);
  }

  // =======================================| ESTUDIANTE |=====================
  verificarParticipacion(data: any): Observable<any> {

    return this.http.get(this.url + `/asistencia/verificarParticipacion?termPersona=${data.matricula}&idConferencia=${data.conferencia}`);
  }

  GetConferencistas(): Observable<any> {

    return this.http.get(this.url + '/persona?esEstudiante=false');
  }

  GetCarrera(id): Observable<any> {

    return this.http.get(this.url + '/carrera?id=' + id);
  }

  GetCuatrimestre(id): Observable<any> {

    return this.http.get(this.url + '/cuatrimestre/byId?id=' + id);
  }

  getEstudiante(data: any): Observable<any> {
    return this.http.get(this.url + '/persona?esEstudiante=true&query=' + data);
  }

  GetConferencista(id): Observable<any> {

    return this.http.get(this.url + '/persona/byId?id=' + id);
  }

  GetAllVerificadores(): Observable<any> {
    return this.http.get(this.url + '/user/getall');
  }

  GetVerifidor(id): Observable<any> {
    return this.http.get(this.url + '/user/getbyid?id=' + id);
  }

  GetConferenciasPorCuatrimestre(actividad): Observable<any> {

    return this.http.get(this.url + '/conferencia/getbycuatrimestre?id=' + actividad);
  }

  GetConferenciasPorCuatrimestreReporte(actividad): Observable<any> {

    return this.http.get(this.url + '/conferencia/reporte_actividades_por_cuatrimestre/' + actividad);
  }

  GetConferenciasDeHoy(): Observable<any> {

    return this.http.get(this.url + '/conferencia/para_hoy');
  }
  GetUltimoCuatrimestre(): Observable<any> {
    return this.http.get(this.url + '/cuatrimestre?last=true');
  }
  GetTodayConf(): Observable<any> {
    return this.http.get(this.url + '/conferencias/hoy');
  }
  // GetAllCuatrimestre(): Observable<any> {
  //   return this.http.get(this.url + '/cuatrimestre?last=true');
  // }

  GetAsistenciaPorConferencias(id_conferencia): Observable<any> {

    return this.http.get(this.url + '/persona/getbyconferencia?id=' + id_conferencia);
  }
  GetReporteAsistenciaPorConferencias(id_conferencia): Observable<any> {

    return this.http.get(this.url + '/conferencia/report-asistencia-por-conferencia?id=' + id_conferencia);
  }
  GetReporteEstudiantes(): Observable<any> {

    return this.http.get(this.url + '/reporte/reporte-estudiantes');
  }

  GetAllEstudiantes(): Observable<any> {

    return this.http.get(this.url + '/estudiantes');
  }


  ConferenciaTerminarOIniciar(id, iniciar: boolean = false): Observable<any> {
    let uri = '/conferencia/iniciar/';
    if (iniciar) {
      uri = '/conferencia/finalizar/';
    }
    return this.http.get(this.url + uri + id);
  }

  // =======================================| ESTUDIANTE |=====================
  ActualizarEstudiante(data: any): Observable<any> {
    return this.http.patch(this.url + '/persona' , JSON.stringify({...data}));

    // return this.http.patch(this.url + '/usuario/estudiante', JSON.stringify(data));
  }

  // =======================================| ESTUDIANTE |=====================
  ActualizarCuatrimestre(data: Object, id): Observable<any> {

    return this.http.patch(this.url + '/cuatrimestre?id=' + id, JSON.stringify(data));
  }
  EliminarActividadCuatrimestre(id): Observable<any> {
    return this.http.delete(this.url + '/cuatrimestre?id=' + id);
  }
  // =======================================| ESTUDIANTE |=====================
  EliminarConferencia(id, id_conferecia_por_conferencista): Observable<any> {
    return this.http.delete(this.url + '/conferencia?id=' + id);
  }
  FinalizarConferencia(id): Observable<any> {
    return this.http.delete(this.url + '/conferencia/finalizar?id=' + id);
  }

  // =======================================| ESTUDIANTE |=====================
  ActualizarVerificador(data: any, id): Observable<any> {

    return this.http.patch(this.url + '/user', JSON.stringify(data));
  }
  RegistrarVerificador(data: any, id): Observable<any> {

    return this.http.post(this.url + '/user/signin', JSON.stringify(data));
  }
  // =======================================| ESTUDIANTE |=====================
  ActualizarCarrera(data: Object, id): Observable<any> {

    return this.http.patch(this.url + '/carrera', JSON.stringify({...data, id: id}));
  }
  EliminarCarrerae(id): Observable<any> {
    return this.http.delete(this.url + '/carrera?id=' + id);
  }

  // =======================================| ESTUDIANTE |=====================
  ActualizarConferencista(data: Object, id): Observable<any> {

    return this.http.patch(this.url + '/persona' , JSON.stringify({...data, id: id}));
  }
}
