import { Component, OnInit } from '@angular/core';
import { RouterModule, Router ,  ActivatedRoute} from '@angular/router';
import {FuncionesService} from '../../services/funciones.service';
import {PeticionesService} from '../../services/peticiones.service';

@Component({
  selector: 'app-list-asistencias',
  templateUrl: './list-asistencias.component.html',
  styleUrls: ['./list-asistencias.component.css']
})
export class ListAsistenciasComponent implements OnInit {
  listaEstudiantesPorActividad: any[];
	conferencia;
  searchText;
  	constructor(private aroute:ActivatedRoute,private _funtions: FuncionesService, private _peticiones :PeticionesService) {
    	this.aroute.queryParams.subscribe( params => {
    		// console.log('params["conferencia"]',params);
        		this.conferencia = JSON.parse( params["conferencia"] );
    		}
  	);

  }

private doThingFactory() {
    // return (fecha1,fecha2) => this.buscarActividades(fecha1,fecha2);
  }
  ngOnInit() {
    this.ListadoEstudiantesPorConferencias()
  }

   ListadoEstudiantesPorConferencias(){

    this._funtions.blockUIO().start()
    this._peticiones.GetEstudiantesPorConferencias(this.conferencia.id).subscribe(
      response => {
        this._funtions.blockUIO().stop()
        console.log(response);
         this.listaEstudiantesPorActividad  = response.data
           
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
