import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { SelectItem, ConfirmationService } from 'primeng/primeng';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuncionesService } from '../../services/funciones.service';
import { PeticionesService } from '../../services/peticiones.service';
import * as moment from 'moment';
import { ListActividadesComponent } from '../list-actividades/list-actividades.component';

@Component({
  selector: 'app-reg-actividad',
  templateUrl: './reg-actividad.component.html',
  styleUrls: ['./reg-actividad.component.css']
})
export class RegActividadComponent implements OnInit {
  formActividad: FormGroup;
  Inpdisplay: boolean;
  id: string;
  // @Output() public Outdisplay = new EventEmitter<boolean>();
  date8: Date;
  minDate: Date;
  minDateFin: Date;
  allCarreras: SelectItem[];
  // carreras: SelectItem[];
  selectedCities: string[];
  // selectedCarreras: string[];


  constructor(
    private aroute: ActivatedRoute,
    private fb: FormBuilder,
    private _router: Router,
    private _funtions: FuncionesService,
    private confirmationService: ConfirmationService,
    private _peticiones: PeticionesService
    ) {
    this.aroute.params.subscribe(params => {
      console.log('params["conferencia"]',
      params);
      this.id = params['id'];
    }
    );

  }
  salir() {
    this.confirmationService.confirm({
      message: '¿Seguro que quieres salir?',
      accept: () => {
        // this.eliminarCargo(id);
        this.OnHIde();
      }
    });
  }
  ngOnInit() {
    this.Inpdisplay = true;
    this.createForm();
    this.allCarreras = [];
    console.log('this.id', this.id);
    if (this.id) {
      this.GetActividad();
    }
    // this.AllCarreras()
    // if(this.id == undefined){
    //   this.minDate = new Date()
    //   this.minDateFin = new Date()
    // }
  }
  onSelectDateInicio(event) {
    this.minDateFin = event;
  }
  createForm(a = { titulo: '', fechaInicio: new Date(), fechaFin: new Date(), descripcion: '' }) {
    // let carreras = JSON.parse(JSON.stringify(a.carreras))
    this.minDate = a.fechaInicio;
    this.minDateFin = a.fechaFin;
    this.formActividad = this.fb.group(a);
    // this.formActividad.controls.carreras.patchValue(carreras);
    this._funtions.actionsOnRoute(this.formActividad.controls);
  }


  GetActividad() {
    this._funtions.blockUIO().start();
    this._peticiones.GetCuatrimestre(this.id).subscribe(
      response => {
        this._funtions.blockUIO().stop();
        console.log(response);
        if (response.info) {
          const actividad = response.data[0];
          actividad.fechaInicio = moment(actividad.fechaInicio).toDate();
          actividad.fechaFin = moment(actividad.fechaFin).toDate();
          // actividad.carreras = [];
          // for (var i = 0; i < response.data.length; ++i) {
          //   let carrera = response.data[i];
          //   actividad.carreras.push(carrera.id_carrera)
          // }
          this.createForm(actividad);
        } else {
          this._funtions.Toast("error", "error", this._funtions.sacarText(response.error));
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
    // console.log("sdfdf",this.formCarrera.value)
  }



  crearActividad() {
    let cNameAction = 'crearCuatrimestre';
    const value = JSON.parse(JSON.stringify(this.formActividad.value));
    if (this.id != null) {
      cNameAction = 'ActualizarCuatrimestre';
      value.id = this.id;

    }
    console.log('value', value, 'cNameAction', cNameAction);

    // let value                = this.formActividad.value
    value.fechaInicio = moment(value.fechaInicio).format('YYYY-MM-DD');
    value.fechaFin = moment(value.fechaFin).format('YYYY-MM-DD');
    console.log('formActividad ', this.formActividad.value);
    this._funtions.blockUIO().start();
    this._peticiones[cNameAction](value, this.id).subscribe(
      response => {
        this._funtions.blockUIO().stop();
        if (response.info) {
          this.OnHIde();
          if (this.id != null) {
            this._funtions.Toast('success', 'Success', this._funtions.sacarText(response.message));
          }
        } else {
          this._funtions.Toast('error', 'Error', this._funtions.sacarText(response.error));
        }
        console.log(response);
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

  AllCarreras() {
    this.allCarreras = [];
    this._funtions.blockUIO().start();
    this._peticiones.GetAllCarrera().subscribe(
      response => {
        this._funtions.blockUIO().stop();
        console.log(response);
        if (response.info) {
          for (let i = 0; i < response.data.length; ++i) {
            const carrera = response.data[i];
            this.allCarreras.push({ label: carrera.nombre, value: carrera.id });
          }
          if (this.id) {
            this.GetActividad();
          }
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


  OnHIde() {
    let uri = 'cuatrimestres';
    this.formActividad.reset();
    this.Inpdisplay = false;
    if (this.id != null) {
      uri = 'cuatrimestres';
    }
    this._router.navigate([uri]);
    ListActividadesComponent.returned.next(false);
    // this.Outdisplay.emit(false);
  }


}
