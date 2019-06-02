import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FuncionesService } from '../../services/funciones.service';
import { PeticionesService } from '../../services/peticiones.service';
import * as moment from 'moment';
import * as printJS from 'print-js';
@Component({
  selector: 'app-report-estudiantes',
  templateUrl: './report-estudiantes.component.html',
  styleUrls: ['./report-estudiantes.component.css']
})
export class ReportEstudiantesComponent implements OnInit {
  allEstudiantes = [];
  allCarreras = [];
  // get allCarrerasDropDown() {
  //   return this.allCarreras.map(
  //     (val) => {
  //       return { label: val.abreviatura, value: val.id };
  //     }
  //   );
  // }
  allCuatrimestres = [];
  get tableData() {
    const res = [];
    if (!this.actividadSeleccionada) {
      return this.allEstudiantes.filter((val) => {
        if (this.cuatrimestreSeleccionada && this.carreraSeleccionada) {
          let ok = false;
          for (let i = 0; i < val.asistencias.length; i++) {
            const asis = val.asistencias[i];
            if (asis.conferencia.cuatrimestre == this.cuatrimestreSeleccionada) {
              ok = true;
            }
          }
          return ok && (val.carrera.id == this.carreraSeleccionada);
        } else if (this.cuatrimestreSeleccionada) {
          let ok = false;
          for (let i = 0; i < val.asistencias.length; i++) {
            const asis = val.asistencias[i];
            if (asis.conferencia.cuatrimestre == this.cuatrimestreSeleccionada) {
              ok = true;
            }
          }
          return ok;
        } else if (this.carreraSeleccionada) {
          return val.carrera.id == this.carreraSeleccionada;
        }
        return true;
      });
    } else {
      return this.allEstudiantes.filter((val) => {
        // if (this.cuatrimestreSeleccionada && this.carreraSeleccionada) {
        let ok = false;
        for (let i = 0; i < val.asistencias.length; i++) {
          const asis = val.asistencias[i];
          if (asis.conferencia.id == this.actividadSeleccionada) {
            ok = true;
          }
        }
        let carrera = true;
        if (this.carreraSeleccionada != null && this.carreraSeleccionada != undefined) {
          carrera = val.carrera.id == this.carreraSeleccionada;
        }
        return ok && carrera;
      });
    }
    // if (this.actividadSeleccionada) {
    //   return this.allEstudiantes.filter((val) => {
    //     // if (this.cuatrimestreSeleccionada && this.carreraSeleccionada) {
    //     let ok = false;
    //     for (let i = 0; i < val.asistencias.length; i++) {
    //       const asis = val.asistencias[i];
    //       if (asis.conferencia.id == this.actividadSeleccionada) {
    //         ok = true;
    //       }
    //     }
    //     return ok;
    //   });
    // } else {
    // return res;
    // }
  }
  get allActividadesbyC() {
    if (this.cuatrimestreSeleccionada) {
      return this.allActividades.filter(
        (val) => {
          // if (
          // console.log('val:', val.cuatrimestre, 'cuatr:', this.cuatrimestreSeleccionada);

          return val.cuatrimestre === parseInt(this.cuatrimestreSeleccionada, 10);
          // ) {
          // return val;
          // }
        }
      );
    }
    this.actividadSeleccionada = undefined;
    return [];
  }
  allActividades = [];
  carreraSeleccionada;
  cuatrimestreSeleccionada;
  actividadSeleccionada;
  totalEstudiantes = 0;
  allCarrerasAsistencia = [];
  constructor(private _funtions: FuncionesService, private _peticiones: PeticionesService) { }

  ngOnInit() {
    this.ListEstudiantes();
  }
  captureScreen() {
    printJS({
      type: 'html',
      printable: 'reporteTable',
      css: 'assets/print.css'
    });
  }
  include(arr, obj) {
    return (arr.indexOf(obj) != -1);
  }

  ListEstudiantes() {
    this._peticiones.GetReporteEstudiantes().subscribe(
      response => {
        this._funtions.blockUIO().stop();
        if (response.info) {
          console.log('RESPONSE OK REPORTE ESTUDIANTE:', response);
          this.allCarreras = response.carreras;
          this.allCuatrimestres = response.cuatrimestres;
          this.allActividades = response.conferencias;
          this.allEstudiantes = response.data;
          // this.allCarrerasAsistencia = [];
          // this.totalEstudiantes = response.data.length;
          // response.data.forEach(estudainte_carrera => {
          //   const carrera = estudainte_carrera.carrera;
          //   if (this.allCarreras.indexOf(carrera) == -1) {
          //     const carrera_asistencia = {};
          //     carrera_asistencia[carrera] = 0;
          //     carrera_asistencia['nombre'] = carrera;
          //     this.allCarrerasAsistencia.push(carrera_asistencia);
          //     this.allCarreras.push(carrera);
          //   }
          // });
          // response.data.forEach(estudiante => {
          //   this.allCarrerasAsistencia.forEach((carrera, index) => {
          //     if (estudiante['carrera'] == carrera.nombre) {
          //       this.allCarrerasAsistencia[index][carrera.nombre] += 1;
          //     }
          //   });
          // });
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
