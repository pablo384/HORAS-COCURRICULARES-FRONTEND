import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng'
import {FuncionesService} from '../../services/funciones.service';
import {PeticionesService} from '../../services/peticiones.service';
import * as moment from "moment"
@Component({
  selector: 'app-list-carreras',
  templateUrl: './list-carreras.component.html',
  styleUrls: ['./list-carreras.component.css']
})
export class ListCarrerasComponent implements OnInit {
	carreras: any[];
  searchText;
  constructor(private _funtions: FuncionesService, private _peticiones :PeticionesService) {
  	this.allCarreras()
    this.searchText='';
  }

  ngOnInit() {
  }

  allCarreras(){
		this.carreras =[]
		this._funtions.blockUIO().start()
  	this._peticiones.GetAllCarrera().subscribe(
      response => {
        this._funtions.blockUIO().stop()
        console.log(response);
        for (var i = 0; i < response.data.length; ++i) {
        	let carrera = response.data[i];
        	this.carreras.push({
        		label:carrera.nombre,
        		value:carrera.id,
        		abreviatura:carrera.abreviatura,
            creado:carrera.createat
        		// creado:moment(carrera.createat).format("DD/MM/YYYY hh:mm:ss")
        		// modificado:moment(carrera.updateat).format("DD/MM/YYYY hh:mm:ss")
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
