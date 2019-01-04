import { Component, OnInit } from '@angular/core';
import { RouterModule, Router ,  ActivatedRoute} from '@angular/router';
import {FuncionesService} from '../../services/funciones.service';
import {PeticionesService} from '../../services/peticiones.service';
import * as moment from "moment"
@Component({
  selector: 'app-report-asistencia-por-conferencia',
  templateUrl: './report-asistencia-por-conferencia.component.html',
  styleUrls: ['./report-asistencia-por-conferencia.component.css']
})
export class ReportAsistenciaPorConferenciaComponent implements OnInit {
	data: any;
    conferencia;
    estudiantes = [];
    carreras = []
    totalAsistencia;
	constructor(private aroute:ActivatedRoute,private _funtions: FuncionesService, private _peticiones :PeticionesService) {

        this.aroute.queryParams.subscribe( params => {
              console.log('params["conferencia"]',params);
                  this.conferencia = JSON.parse( params["conferencia"] );
                  this.conferencia.dia_de_presentacion= moment(params["conferencia"].dia_de_presentacion).format("YYYY-MM-DD")
                  this.ListadoEstudiantesPorConferencias( this.conferencia.id );
              }
         );

        this.data = {
            labels: ['January', 'February'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: '#42A5F5',
                    borderColor: '#1E88E5',
                    data: [1]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: '#9CCC65',
                    borderColor: '#7CB342',
                    data: [2]
                }
            ]
        }
    }
	ngOnInit() {
        this.ListadoEstudiantesPorConferencias( this.conferencia.id );
	}

    ListadoEstudiantesPorConferencias(conferencia_id){
        this._funtions.blockUIO().start()
        this._peticiones.GetEstudiantesPorConferencias(conferencia_id).subscribe(
          response => {
            console.log("adasda",response);
            this.estudiantes = response.data
            let carreras = [];
            response.data.forEach((estudiante_carrera)=>{
                if( Object.keys(carreras).indexOf(estudiante_carrera.carrera) == -1){
                    carreras[estudiante_carrera.carrera] = { asistencia : 1, carrera :estudiante_carrera.carrera }
                }else{
                    carreras[estudiante_carrera.carrera].asistencia += 1 
                }
            })
            let aCarreras = []
            for (var carrera in carreras){
                let oCarrera = { 'carrera' : carrera , asistencia:0 }
                aCarreras.push(oCarrera)
                response.data.forEach((estudiante_carrera)=>{
                    if(estudiante_carrera.carrera == carrera){
                        oCarrera.asistencia += 1
                    }
                })
            }
            this.carreras = aCarreras
            this._funtions.blockUIO().stop()
            this.totalAsistencia  = response.data.length
          },
          error => {
            let resultado;
            if (error.error && error.status !== 0) {
              resultado = this._funtions.sacarText(error.error);
            } else {
              resultado = error.error.error;
            }
            console.log(error.error)
            this._funtions.Toast("error","Error",resultado);

            this._funtions.blockUIO().stop(); 
          }
        );
    }

}
