import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FuncionesService } from '../../services/funciones.service';
import { PeticionesService } from '../../services/peticiones.service';
import * as moment from 'moment';

import * as printJS from 'print-js';
@Component({
  selector: 'app-report-cuatrimestres',
  templateUrl: './report-cuatrimestres.component.html',
  styleUrls: ['./report-cuatrimestres.component.css']
})
export class ReportCuatrimestresComponent implements OnInit {
  ListDeActividades = [];
  listCuatrimestres = [];
  cuatrimestreSeleccionado;
  constructor(private _funtions: FuncionesService, private _peticiones: PeticionesService) { }

  ngOnInit() {
    this.getCuatrimestres();
    // this.ListActividades();
  }
  captureScreen() {
    printJS({
      type: 'html',
      printable: 'todoReport',
      css: 'assets/print.css'
    });
    // printJS('todoReport', 'html');
  }
  getCuatrimestres() {
    this._peticiones.GetAllCuatrimestres().subscribe(
      (res: any) => {
        if (res.info) {
          this.listCuatrimestres = res.data;
        }
      }
    );
  }
  getbyCuatrimestres() {
    if (this.cuatrimestreSeleccionado) {
      this._peticiones.GetConferenciasPorCuatrimestre(this.cuatrimestreSeleccionado).subscribe(
        (res: any) => {
          if (res.info) {
            this.ListDeActividades = res.data;
          }
        }
      );
    }
  }
  ListActividades() {
    this._peticiones.GetAllActividades().subscribe(
      response => {
        this._funtions.blockUIO().stop();
        console.log('GetAllActividades ... ...', response);
        console.log('GetAllActividades ...', response.data);
        if (response.info) {
          response.data.forEach(cuatrimestre => {
            cuatrimestre.fecha_inicio = moment(cuatrimestre.fecha_inicio).format('YYYY-MM-DD');
            cuatrimestre.fecha_finalizar = moment(cuatrimestre.fecha_finalizar).format('YYYY-MM-DD');
            this.ListDeActividades.push(cuatrimestre);
          });
          console.log('cuatrimestre', this.ListDeActividades);
          // this.ListDeActividades = response.data;
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
