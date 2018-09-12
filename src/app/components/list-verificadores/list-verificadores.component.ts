import { Component, OnInit } from '@angular/core';
import {PeticionesService} from '../../services/peticiones.service';
import {FuncionesService} from '../../services/funciones.service';
import * as moment from "moment"
@Component({
  selector: 'app-list-verificadores',
  templateUrl: './list-verificadores.component.html',
  styleUrls: ['./list-verificadores.component.css']
})
export class ListVerificadoresComponent implements OnInit {
  constructor(private _funtions: FuncionesService, private _peticiones :PeticionesService) { }
  verificadores
  searchText;
  ngOnInit() {
    this.searchText='';
  	this.allVerificadores()
  }

  allVerificadores(){
		this.verificadores =[]
		this._funtions.blockUIO().start()
  	this._peticiones.GetAllVerificadores().subscribe(
      response => {
        this._funtions.blockUIO().stop()
        console.log(response);
        for (var i = 0; i < response.data.length; ++i) {
        	let verificador = response.data[i];
        	this.verificadores.push({
        		apellidos:verificador.apellidos,
        		nombres:verificador.nombres,
        		user:verificador.usuario,
        		direccion:verificador.direccion,
        		correo:verificador.email,
        		id_persona:verificador.id_persona,
        		telefono:verificador.telefono,
        		estado:verificador.estado,
        		creado:moment(verificador.createat).format("DD/MM/YYYY hh:mm:ss")
        		// modificado:moment(verificador.updateat).format("DD/MM/YYYY hh:mm:ss")
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
