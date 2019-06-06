import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FuncionesService } from '../../services/funciones.service';
import { PeticionesService } from '../../services/peticiones.service';
import * as moment from 'moment'
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-list-conferencias',
  templateUrl: './list-conferencias.component.html',
  styleUrls: ['./list-conferencias.component.css']
})
export class ListConferenciasComponent implements OnInit, OnDestroy {
  ListadoDeConferenciasPorActividad: any[];
  actividad;
  id_actividad;
  id;
  carreras = [];

  private onDestroy$ = new Subject<void>();

  constructor(
    private aroute: ActivatedRoute,
    private _funtions: FuncionesService,
    private confirmationService: ConfirmationService,
    private _peticiones: PeticionesService
  ) {
    this.aroute.queryParams.subscribe(params => {
      console.log('params["actividad"]', params);
      if (params['actividad'] != undefined) {
        this.actividad = JSON.parse(params['actividad']);
      }
      if (params['id_actividad'] != undefined) {
        this.id = params['id_actividad'];
      }
      console.log('params["actividad"]', this.actividad);
    }
    );

    this.aroute.params.subscribe(params => {
      console.log('RegConferenciaComponent ', this.aroute);
      // this.id = params["id"]
      this.id_actividad = params['id_actividad'];
    });

  }


  ngOnInit() {
    this.ListasDeConferencias();

  }
  // getCarreras() {
  //   this._peticiones.GetAllCarrera().subscribe(
  //     response => {
  //       this._funtions.blockUIO().stop();
  //       console.log('GetAllCarrera', response);

  //     },
  //     error => {
  //       let resultado;
  //       if (error.error && error.status !== 0) {
  //         resultado = this._funtions.sacarText(error.error);
  //       } else {
  //         resultado = error.error.error;
  //       }
  //       console.log(error.error);
  //       this._funtions.Toast('error', 'Error', resultado);

  //       this._funtions.blockUIO().stop();
  //     }
  //   );
  // }

  calcularTiempoTrasncurrido() {
    if (this.ListadoDeConferenciasPorActividad != null) {
      for (let i = 0; i < this.ListadoDeConferenciasPorActividad.length; ++i) {
        const conferencia = this.ListadoDeConferenciasPorActividad[i];
        conferencia.transcurrido = ''
        if (conferencia.horaInicio != null) {
          let duration;
          if (conferencia.horaFin != null) {
            const horaInicio = moment(conferencia.horaInicio, 'YYYY-MM-DDThh:mm:ssZ').add(12, 'hours');
            duration = moment.duration(horaInicio.diff(moment(conferencia.horaFin, 'YYYY-MM-DDThh:mm:ssZ').add(12, 'hours')));
          } else {
            duration = moment.duration(moment().diff(moment(conferencia.horaInicio, 'YYYY-MM-DDThh:mm:ssZ').add(12, 'hours')));
          }
          conferencia.transcurrido = duration.humanize();
          // console.log("duration",duration)
        }
        // console.log(conferencia)
      }
    }
    // console.log("this.ListadoDeConferenciasPorActividad",this.ListadoDeConferenciasPorActividad)
  }
  formatHour(hours) {
    return moment(hours, 'HH:mm').format('hh:mm a');
  }
  isProgress(timeInit, timeEnd) {
    // console.log('progreso::', moment(timeInit, 'HH:mm').unix(), timeEnd, moment().hour());
    // console.log('progreso:COND:', moment(timeInit).unix() < moment().unix(), (!timeEnd || timeEnd ===  '' || timeEnd ===  '0'));
    if (moment(timeInit).unix() < moment().unix() && (!timeEnd || timeEnd ===  '' || timeEnd ===  '0')) {
      return true;
    }
    return false;
  }
  isEnded(timeInit, timeEnd) {
    if (moment(timeInit).unix() < moment().unix() && timeEnd != '') {
      return true;
    }
    return false;
  }
  isNotStarted(timeInit, timeEnd) {
    if (moment(timeInit).unix() > moment().unix() && timeEnd === '') {
      return true;
    }
    return false;
  }
  tiempoTrancurrido(timeInit, timeEnd) {
    if (this.isProgress(timeInit, timeEnd)) {
      return moment.duration(moment(timeInit).valueOf() - moment().valueOf()).humanize();
    } else if (this.isEnded(timeInit, timeEnd)) {
      return moment.duration(moment(timeInit).valueOf() - moment(timeEnd).valueOf()).humanize();
    } else if (this.isNotStarted(timeInit, timeEnd)) {
      return 'No iniciada';
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }


  EliminarConferencia(index, id_conferencia, id_conferencista_por_actividad) {
    console.log('id_conferencia,id_conferencista_por_actividad', id_conferencia, id_conferencista_por_actividad);
    this.confirmationService.confirm({
      acceptLabel: 'Si',
      rejectLabel: 'No',
      message: '¿Seguro que quieres eliminar esta actividad?',
      accept: () => {
        // Actual logic to perform a confirmation
        this.EliminarConferenciaPeticion(index, id_conferencia, id_conferencista_por_actividad);
      }
    });
  }
  EliminarConferenciaPeticion(index, id_conferencia, id_conferencista_por_actividad) {
    console.log('id_conferencia,id_conferencista_por_actividad', id_conferencia, id_conferencista_por_actividad);
    this._peticiones.EliminarConferencia(id_conferencia, id_conferencista_por_actividad).subscribe(
      response => {
        this._funtions.blockUIO().stop();
        console.log('sdfkjdsjfjdsfj', response);
        if (response.info) {
          this.ListadoDeConferenciasPorActividad.splice(index, 1);
          this._funtions.Toast('success', 'Eliminada', response.message);
        }
      },
      error => {
        let resultado;
        if (error.error && error.status !== 0) {
          resultado = this._funtions.sacarText(error.error);
        } else {
          resultado = error.error.error;
        }
        console.log(error.error);
        this._funtions.Toast('error', 'Error', resultado);
        this._funtions.blockUIO().stop();
      }
    );
  }
  finalizarConferencia(index, id_conferencia, id_conferencista_por_actividad) {
    // console.log('id_conferencia,id_conferencista_por_actividad', id_conferencia, id_conferencista_por_actividad);
    this.confirmationService.confirm({
      acceptLabel: 'Si',
      rejectLabel: 'No',
      message: '¿Seguro que quieres finalizar esta actividad?',
      accept: () => {
        // Actual logic to perform a confirmation
        this.finalizarConferenciaPeticion(index, id_conferencia);
      }
    });
  }
  finalizarConferenciaPeticion(index, id_conferencia) {
    // console.log('id_conferencia,id_conferencista_por_actividad', id_conferencia);
    this._peticiones.FinalizarConferencia(id_conferencia).subscribe(
      response => {
        this._funtions.blockUIO().stop();
        // console.log('sdfkjdsjfjdsfj', response);
        if (response.info) {
          // this.ListadoDeConferenciasPorActividad.splice(index, 1);
          this.ListasDeConferencias();
          this._funtions.Toast('success', 'Finalizada', response.message);
        }
      },
      error => {
        let resultado;
        if (error.error && error.status !== 0) {
          resultado = this._funtions.sacarText(error.error);
        } else {
          resultado = error.error.error;
        }
        console.log(error.error);
        this._funtions.Toast('error', 'Error', resultado);
        this._funtions.blockUIO().stop();
      }
    );
  }
  ListasDeConferencias() {
    console.log('ListasDeConferencias(this.actividad && this.actividad.id) || this.id', this.id_actividad);
    this._peticiones.GetConferenciasPorCuatrimestre(this.id_actividad).subscribe(
      // this._peticiones.GetConferenciasPorCuatrimestre(this.a).subscribe(
      response => {
        this._funtions.blockUIO().stop();
        console.log('sdfkjdsjfjdsfj', response.data);
        if (response.info) {
          // console.log("SDFKJDSJFJDSFJDENTRO",response.data);
          this.ListadoDeConferenciasPorActividad = response.data;
          this.calcularTiempoTrasncurrido();
          const t = Observable.interval(1000 * 3).takeUntil(this.onDestroy$);
          t.subscribe(i => this.calcularTiempoTrasncurrido());
        }
      },
      error => {
        let resultado;
        if (error.error && error.status !== 0) {
          resultado = this._funtions.sacarText(error.error);
        } else {
          resultado = error.error.error;
        }
        console.log(error.error);
        this._funtions.Toast('error', 'Error', resultado);

        this._funtions.blockUIO().stop();
      }
    );
  }
}
