import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, Route } from '@angular/router';
import { FuncionesService } from '../../services/funciones.service';
import { PeticionesService } from '../../services/peticiones.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment'
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-reg-conferencia',
  templateUrl: './reg-conferencia.component.html',
  styleUrls: ['./reg-conferencia.component.css']
})
export class RegConferenciaComponent implements OnInit {
  formConferencia: FormGroup;
  Inpdisplay: boolean;
  formPerson: FormGroup;
  date8: Date;
  dateValue: Date;
  porcentaje_default: any[];
  cuatrimestre: number;
  conferencista: string;
  ListadoConferencistas: any[];
  id_conferencia;
  carreras: any[] = [];
  constructor(
    private aroute: ActivatedRoute,
    private fb: FormBuilder,
    private _router: Router,
    private _funtions: FuncionesService,
    private confirmationService: ConfirmationService,
    private _peticiones: PeticionesService
  ) {
    this.aroute.params.subscribe(params => {
      this.id_conferencia = params['id'];
    });
    if (this._router.url.split('/').length > 0 && this._router.url.split('/')[1] != undefined) {
      this.cuatrimestre = Number(this._router.url.split('/')[1]);
    }

    this.porcentaje_default = [];
    for (let i = 80; i <= 100; i = i + 5) {
      this.porcentaje_default.push({ name: i + '%', value: i });
    }

    this.Inpdisplay = true;
    this.listadoDeConferencistas();
    this.createForm();
  }
  salir() {
    this.confirmationService.confirm({
      acceptLabel: 'Si',
      rejectLabel: 'No',
      message: '¿Seguro que quieres salir?',
      accept: () => {
        // this.eliminarCargo(id);
        this.OnHIde();
      }
    });
  }
  ngOnInit() {
    console.log('LOG REGISTRO COMPONENT URL::::', this._router.url);
    console.log('LOG REGISTRO COMPONENT URL::::', this._router.url.toString().search('editar'));
    // console.log('LOG REGISTRO COMPONENT INICIADO::::', this._router.);
    console.log('LOG REGISTRO COMPONENT INICIADO::::', this.aroute.params);
    this.getCarreras();
  }

  OnHIde() {
    // this.formPerson.reset();
    this.Inpdisplay = false;
    this._router.navigate(['/cuatrimestres']);
    // this.Outdisplay.emit(false);
  }

  listadoDeConferencistas() {
    // console.log(this.loginForm.value);
    this._funtions.blockUIO().start();
    this._peticiones.GetConferencistas().subscribe(
      response => {
        this._funtions.blockUIO().stop();
        console.log('response', response);
        this.ListadoConferencistas = response.data;
        if (this.id_conferencia != undefined) {
          this.Conferencia();
        }
      },
      error => {
        let resultado;
        if (error.error && error.status !== 0) {
          resultado = this._funtions.sacarText(error.error);
        } else {
          resultado = error.error.message;
        }
        console.log(error.error.message);
        this._funtions.Toast('error', 'Error', resultado);

        this._funtions.blockUIO().stop();
      }
    );

  }


  Conferencia() {
    // console.log(this.loginForm.value);
    this._funtions.blockUIO().start();
    this._peticiones.getConferencia(this.id_conferencia).subscribe(
      response => {
        this._funtions.blockUIO().stop();
        console.log('getConferencia response', response);
        response['data'].horaInicio = moment(response['data'].horaInicio).toDate();
        response['data'].diaPresentacion = moment(response['data'].diaPresentacion).toDate();
        // const dmo = moment(response['data'].duracionEstimada);
        // const dur = moment.duration(dmo.milliseconds());
        // response['data'].duracionEstimada = dmo.format('HH:mm:ss');
        // console.log('DUARECION VALOR::', dur, dmo, dmo.format('HH:mm:ss'));
        
        this.createForm(response['data']);
      },
      error => {
        let resultado;
        if (error.error && error.status !== 0) {
          resultado = this._funtions.sacarText(error.error);
        } else {
          resultado = error.error.message;
        }
        console.log(error.error.message);
        this._funtions.Toast('error', 'Error', resultado);

        this._funtions.blockUIO().stop();
      }
    );

  }



  createForm(
    a = {
      id: '',
      titulo: '',
      descripcion: '',
      horaInicio: new Date(),
      duracionEstimada: '',
      diaPresentacion: new Date(),
      porcientoHorasValidas: 0,
      valorConf: 1,
      conferencista: '',
      carrera: ''
    }
  ) {
    const temp = JSON.parse(JSON.stringify(a));
    console.log('a ', a);
    // let hor
    this.formConferencia = this.fb.group({
      id: a.id,
      titulo: [a.titulo, Validators.required],
      descripcion: a.descripcion,
      horaInicio: [a.horaInicio, Validators.required],
      duracionEstimada:
      [a.duracionEstimada, Validators.compose([Validators.pattern('([0-2]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])'), Validators.required])],
      diaPresentacion: [a.diaPresentacion, Validators.required],
      valorConf: [a.valorConf, Validators.required],
      porcientoHorasValidas: [a.porcientoHorasValidas, Validators.required],
      conferencista: [a.conferencista, Validators.required],
      carrera: [a.carrera, Validators.required],
    });
    this.formConferencia.controls
    .porcientoHorasValidas.patchValue({ name: temp.porcientoHorasValidas + '%', value: temp.porcientoHorasValidas });
    this._funtions.actionsOnRoute(this.formConferencia.controls);
  }

  getCarreras() {
    this._peticiones.GetAllCarrera().subscribe(
      response => {
        this._funtions.blockUIO().stop();
        console.log('GetAllCarrera', response);
        this.carreras = response.data;
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

  onSubmit() {
    const isEdit = this._router.url.toString().search('editar') != -1 ? true : false;
    console.log('console.log(this.formConferencia.value)', this.formConferencia.value);
    const value = JSON.parse(JSON.stringify(this.formConferencia.value));
    let duracion = value.duracionEstimada.replace(':', '');
    duracion = duracion.replace(':', '');
    if (parseInt(duracion) > 0) {
      value.horaInicio = moment(value.horaInicio).format('HH:mm');
      value.diaPresentacion = moment(value.diaPresentacion).format('YYYY-MM-DD');
      value.porcientoHorasValidas = value.porcientoHorasValidas.value;
      value.conferencista = value.conferencista.id;
      value.carrera = value.carrera.id;
      value.cuatrimestre = this.cuatrimestre;
      console.log('onSubmit ', JSON.stringify(value));
      if (isEdit) {
        this._peticiones.updateConferencia(value, value.id).subscribe(
          response => {
            this._funtions.blockUIO().stop();
            console.log('updateConferencia response', response);
            if (response['info']) {

              this._funtions.Toast('success', 'success', response.message);
              this.OnHIde();
            } else {
              this._funtions.Toast('error', 'Error', this._funtions.sacarText(response.error));
            }
          },
          error => {
            let resultado;
            if (error.error && error.status !== 0) {
              resultado = this._funtions.sacarText(error.error);
            } else {
              resultado = error.error.message;
            }
            console.log(error.error);
            this._funtions.Toast('error', 'Error', resultado);

            this._funtions.blockUIO().stop();
          }
        );
      } else {
        this._peticiones.crearConferencia(value).subscribe(
          response => {
            this._funtions.blockUIO().stop();
            console.log('response', response);
            if (response['info']) {

              this._funtions.Toast('success', 'success', response.message);
              this.OnHIde();
            } else {
              this._funtions.Toast('error', 'Error', this._funtions.sacarText(response.error));
            }
          },
          error => {
            let resultado;
            if (error.error && error.status !== 0) {
              resultado = this._funtions.sacarText(error.error);
            } else {
              resultado = error.error.message;
            }
            console.log(error.error);
            this._funtions.Toast('error', 'Error', resultado);

            this._funtions.blockUIO().stop();
          }
        );
      }
    } else {
      this._funtions.Toast("error", "Error", "Duración de la conferencia incorrecta!");
    }
    // value.conferencista = this.conferencista;
    // console.log("formConferencia",JSON.stringify(value))
  }
}
