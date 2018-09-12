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
          for (var i = 0; i < response.data.length; ++i) {
            let conf = response.data[i];
            conf.hora_pasada = moment().isAfter(moment(conf.hora_inicio));
            // console.log( moment().isAfter(moment(conf.hora_inicio)))
          }
          this.ListadoDeConferencias = response.data;
        },
        error => {
          this._funtions.blockUIO().stop(); 
          let resultado;
          if (error.error && error.status !== 0) {
            resultado = this._funtions.sacarText(error.error);
          } else {
            resultado = error.error.message;
          }
          console.log(error.error.message)
          this._funtions.Toast("error","Error",resultado);

        }
      );

  }
}
