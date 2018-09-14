import { Component, OnInit } from '@angular/core';
import {FuncionesService} from '../../services/funciones.service';
import {PeticionesService} from '../../services/peticiones.service';
@Component({
  selector: 'app-list-conferencistas',
  templateUrl: './list-conferencistas.component.html',
  styleUrls: ['./list-conferencistas.component.css']
})
export class ListConferencistasComponent implements OnInit {
	ListadoConferencistas;
  searchText;
    constructor(private _funtions: FuncionesService, private _peticiones :PeticionesService ) {
      this.searchText='';
    }

  ngOnInit() {
  	this.listadoDeConferencistas()
  }

  listadoDeConferencistas() {
    
    // console.log(this.loginForm.value);
    this._funtions.blockUIO().start()
    this._peticiones.GetConferencistas().subscribe(
      response => {
         this._funtions.blockUIO().stop()
        console.log('response',response);
        this.ListadoConferencistas = response.data;

      },
      error => {
        let resultado;
        if (error.error && error.status !== 0) {
          resultado = this._funtions.sacarText(error.error);
        } else {
          resultado = error.error.message;
        }
        console.log(error.error.message)
        this._funtions.Toast("error","Error",resultado);

        this._funtions.blockUIO().stop(); 
      }
    );

  }

}
