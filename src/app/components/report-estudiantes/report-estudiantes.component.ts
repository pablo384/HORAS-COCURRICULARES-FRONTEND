import { Component, OnInit,OnDestroy } from '@angular/core';
import {Observable,Subject} from "rxjs";
import { RouterModule, Router ,  ActivatedRoute} from '@angular/router';
import {FuncionesService} from '../../services/funciones.service';
import {PeticionesService} from '../../services/peticiones.service';
import * as moment from "moment"
@Component({
  selector: 'app-report-estudiantes',
  templateUrl: './report-estudiantes.component.html',
  styleUrls: ['./report-estudiantes.component.css']
})
export class ReportEstudiantesComponent implements OnInit {
	allEstudiantes        = [];
	allCarreras           = []
	totalEstudiantes      = 0
	allCarrerasAsistencia = []
  	constructor(private _funtions: FuncionesService, private _peticiones :PeticionesService) { }

  	ngOnInit() {
		this.ListEstudiantes();
	}

	include(arr,obj) {
    	return (arr.indexOf(obj) != -1);
	}

	ListEstudiantes(){
		this._peticiones.GetAllEstudiantes().subscribe(
	  response => {
	    this._funtions.blockUIO().stop()
	    if (response.info){
	    	this.allEstudiantes = response.data
	    	this.allCarrerasAsistencia = [];
	    	this.totalEstudiantes= response.data.length
		    response.data.forEach(estudainte_carrera=>{
		    	let carrera = estudainte_carrera.carrera
		    	if( this.allCarreras.indexOf(carrera) == -1){
			    	let carrera_asistencia = {};
			    	carrera_asistencia[carrera] = 0
			    	carrera_asistencia['nombre'] = carrera
			    	this.allCarrerasAsistencia.push(carrera_asistencia)
		    		this.allCarreras.push(carrera)
		    	}
		    })
		    response.data.forEach( estudiante=> {
		    	this.allCarrerasAsistencia.forEach( (carrera,index )=> {
		    		if(estudiante['carrera'] == carrera.nombre){
		    			this.allCarrerasAsistencia[index][carrera.nombre] += 1 
		    		}
		    	})
		    })
	    }
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
