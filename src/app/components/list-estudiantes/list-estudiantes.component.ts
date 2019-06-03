import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { FuncionesService } from '../../services/funciones.service';
import { PeticionesService } from '../../services/peticiones.service';
import * as printJS from 'print-js';
@Component({
  selector: 'app-list-estudiantes',
  templateUrl: './list-estudiantes.component.html',
  styleUrls: ['./list-estudiantes.component.css']
})
export class ListEstudiantesComponent implements OnInit {
  searchText;
  EstudianteSeleccionado;
  filteredEstudiantes: any[];
  Estudiantes: any[] = [];
  cDatosSearch: string;
  estudiante: any[];
  display_actividades = false;
  display_entrada_salida = false;
  actividadesPar = [];
  asistencias = [];
  public static returned: Subject<any> = new Subject();
  subc: Subscription;
  constructor(private _funtions: FuncionesService, private _peticiones: PeticionesService) {
    this.subc = ListEstudiantesComponent.returned.subscribe(res => {
      this.getEstudiante(this.cDatosSearch);
    });
  }

  ngOnInit() {
    this.getEstudiante('fffff');
  }
  toggleActi() {
    this.display_actividades = !this.display_actividades;
  }
  toggleActiEntrada() {
    this.display_entrada_salida = !this.display_entrada_salida;
  }
  getConfParticipadas(id) {
    this._peticiones.getConferenciasParticipadas(id).subscribe(
      res => {
        this.actividadesPar = res.data;
        this.toggleActi();
      }
    );
  }
  getEntradaSalida(id) {
    this._peticiones.getReporteEntradaSalida(id).subscribe(
      res => {
        this.asistencias = res.data;
        this.toggleActiEntrada();
      }
    );
  }

  ngOnDestroy(): void {
    this.subc.unsubscribe();
  }
  doThingFactory() {
    return (cDatos) => this.getEstudiante(cDatos);
  }
  printReport() {
    // example1
    printJS({
      type: 'html',
      printable: 'tablereport',
      css: 'assets/print.css',
      header: 'Reporte de asistencia matricula:' + this.EstudianteSeleccionado.matricula,
    });
  }
  printReportEntradaSalida() {
    // example1
    printJS({
      type: 'html',
      printable: 'tablereportentrada',
      css: 'assets/print.css',
      header: 'Reporte de Entrada/Salida matricula:' + this.EstudianteSeleccionado.matricula,
    });
  }


  search(event) {
    this.filteredEstudiantes = [];

    const searchKeyword = event.query.toLowerCase();
    this.Estudiantes.forEach(item => {
      // Object.values(item) => gives the list of all the property values of the 'item' object
      const propValueList = Object.values(item);
      for (let i = 0; i < propValueList.length; i++) {
        if (propValueList[i]) {
          if (propValueList[i].toString().toLowerCase().indexOf(searchKeyword) > -1) {
            this.filteredEstudiantes.push(item);
            break;
          }
        }
      }
    });



    // for(let i = 0; i < this.Estudiantes.length; i++) {
    //     let brand = this.Estudiantes[i];
    //     console.log("filterProductos",event.query)
    //     if(brand["nombres"].toLowerCase().indexOf(event.query.toLowerCase()) == 0 || brand["matricula"].toLowerCase().indexOf(event.query.toLowerCase()) == 0 ) {
    //         this.filteredEstudiantes.push(brand);
    //     }
    // }
  }


  getEstudiante(cDatos) {
    const value = {};
    // if( cDatos && (cDatos.length < 0) ){
    // 	return;
    // }
    this.cDatosSearch = cDatos;
    if (!isNaN(parseInt(cDatos)) && parseInt(cDatos) > 0) {
      if (cDatos.length == 16) {
        value['carnet'] = cDatos;
      } else {
        value["matricula"] = cDatos;
      }
    } else {
      value['usuario'] = cDatos;
    }
    const correcto = false;
    // console.log("getEstudiante",value)
    // if(value["usuario"] != undefined || value["matricula"] != undefined || value["carnet"]){
    //   correcto = true;
    // }
    // if(!correcto){
    //   return;
    // }
    console.log('getEstudiante', value);
    this._peticiones.getEstudiante(cDatos).subscribe(
      response => {
        this._funtions.blockUIO().stop();
        console.log('getEstudiante', response);
        if (response.info) {
          // this.estudiante = response.data;
          this.Estudiantes = response.data;
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
