import { Component, OnInit } from '@angular/core';
import {FuncionesService} from '../../services/funciones.service';
import {PeticionesService} from '../../services/peticiones.service';

@Component({
  selector: 'app-list-estudiantes',
  templateUrl: './list-estudiantes.component.html',
  styleUrls: ['./list-estudiantes.component.css']
})
export class ListEstudiantesComponent implements OnInit {
	searchText;
	estudiante:any[];
  constructor(private _funtions: FuncionesService, private _peticiones :PeticionesService) { }

  ngOnInit() {
  }

  private doThingFactory() {
    return (cDatos) => this.getEstudiante(cDatos);
  }

  getEstudiante(cDatos){
  	let value = {}
  	if( !(cDatos.length>0) ){
  		return;
  	}
    if (!isNaN(parseInt(cDatos)) && parseInt(cDatos)>0){
      if (cDatos.length == 16){
        value["carnet"] = cDatos;
      }else
        value["matricula"] = cDatos;
    }else{
      value["usuario"] = cDatos
    }
    console.log(value)
  	this._peticiones.getEstudiante(value).subscribe(
      response => {
        this._funtions.blockUIO().stop()
        console.log("getEstudiante",response);
        if (response.info) {        
        	this.estudiante = response.data;
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
