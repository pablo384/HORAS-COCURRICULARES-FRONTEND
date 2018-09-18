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
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: '#42A5F5',
                    borderColor: '#1E88E5',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: '#9CCC65',
                    borderColor: '#7CB342',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        }
    }
	ngOnInit() {
	}

    ListadoEstudiantesPorConferencias(conferencia_id){
        this._funtions.blockUIO().start()
        this._peticiones.GetEstudiantesPorConferencias(conferencia_id).subscribe(
          response => {
            this._funtions.blockUIO().stop()
            console.log("adasda",response);
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
