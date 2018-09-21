import { Component, OnInit } from '@angular/core';
import {FuncionesService} from '../../services/funciones.service';
import {PeticionesService} from '../../services/peticiones.service';
import { Router, ActivatedRoute } from '@angular/router';
import {ConfirmationService} from 'primeng/api';
import * as moment from "moment"
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ListadoDeConferencias:any[];
  fechaActual:Date;
  constructor(private _digalog:ConfirmationService,private _funtions: FuncionesService, private _peticiones :PeticionesService,private _router: Router) {
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
            conf.hora_pasada = false;//moment().isAfter(moment(conf.hora_inicio));
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

  confirm(item) {
    let cMsg = "Esta seguro que deseas finalizar esta conferencia?";
    if(!item.iniciada){
      cMsg ="Esta seguro que deseas iniciar esta conferencia?"
    }
    this._digalog.confirm({
        message: cMsg,
        accept: () => {
            this.ConferenciaTerminarOIniciar(item);
        }
    });
  }
  ConferenciaTerminarOIniciar(item){
    this._funtions.blockUIO().start()
      this._peticiones.ConferenciaTerminarOIniciar(item.codigo,item.iniciada).subscribe(
        response => {
          this._funtions.blockUIO().stop()
          console.log('response',response);
          if(response.info){
            if (!item.finalizada && item.iniciada){
              item.finalizada = true;
            }
            if(!item.iniciada){
             item.iniciada = true;
            }
            this._funtions.Toast("success", "success",response.message);
            this._router.navigate(['/home']);
          }else
            this._funtions.Toast("error","Error",response.error || response.message);
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
