import { Component, OnInit } from '@angular/core';
import {FuncionesService} from '../../services/funciones.service';
import {PeticionesService} from '../../services/peticiones.service';
import * as moment from "moment"
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ListadoDeConferencias:any[];
  fechaActual:Date;
  constructor(private _funtions: FuncionesService, private _peticiones :PeticionesService) {
    this.fechaActual =new Date();
    // this.ListadoDeConferencias = [
    //   {'actividad':'X','conferencia':'Y','estado':'A'},
    //   {'actividad':'X','conferencia':'Y','estado':'A'},
    //   {'actividad':'X','conferencia':'Y','estado':'A'},
    //   {'actividad':'X','conferencia':'Y','estado':'A'},
    //   {'actividad':'X','conferencia':'Y','estado':'A'},
    //   {'actividad':'X','conferencia':'Y','estado':'A'}
    // ]
    this.listaDeActividadesYConferenciasDeHoy()

  }

  ngOnInit() {
  }
  listaDeActividadesYConferenciasDeHoy(){
    this._funtions.blockUIO().start()
      this._peticiones.GetConferenciasDeHoy().subscribe(
        response => {
           this._funtions.blockUIO().stop()
          console.log('response',response);
          this.ListadoDeConferencias = response.data;
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
