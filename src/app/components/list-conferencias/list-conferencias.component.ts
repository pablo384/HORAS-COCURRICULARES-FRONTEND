import { Component, OnInit,OnDestroy } from '@angular/core';
import {Observable,Subject} from "rxjs";
import { RouterModule, Router ,  ActivatedRoute} from '@angular/router';
import {FuncionesService} from '../../services/funciones.service';
import {PeticionesService} from '../../services/peticiones.service';
import * as moment from "moment"
@Component({
  selector: 'app-list-conferencias',
  templateUrl: './list-conferencias.component.html',
  styleUrls: ['./list-conferencias.component.css']
})
export class ListConferenciasComponent implements OnInit,OnDestroy {
	ListadoDeConferenciasPorActividad:any[];
	actividad;
  private onDestroy$ = new Subject<void>();

	constructor(private aroute:ActivatedRoute,private _funtions: FuncionesService, private _peticiones :PeticionesService) { 
		// this.ListadoDeConferenciasPorActividad = [
	 //  		{id:1,titulo:"Encriptación",fecha_inicio:"101212",fecha_fin:"123213"},
	 //  		{id:2,titulo:"El mundo de Git",fecha_inicio:"101212",fecha_fin:"123213"},
	 //  		{id:3,titulo:"Hello Mundo",fecha_inicio:"101212",fecha_fin:"123213"},
	 //  	]
		  this.aroute.queryParams.subscribe( params => {
	  		console.log('params["actividad"]',params);
	      		this.actividad = JSON.parse( params["actividad"] );
	  		}
	     );
	}

	ngOnInit() {
		this.ListasDeConferencias();

	}

  calcularTiempoTrasncurrido(){
    if(this.ListadoDeConferenciasPorActividad != null){
      for (var i = 0; i < this.ListadoDeConferenciasPorActividad.length; ++i) {
       let conferencia = this.ListadoDeConferenciasPorActividad[i];
       conferencia.transcurrido = ""
       if(conferencia.hora_inicio != null){
          let duration;
          if(conferencia.hora_fin!= null){
            let hora_inicio = moment(conferencia.hora_inicio,"YYYY-MM-DDThh:mm:ssZ").add(12,'hours')  
            duration = moment.duration(hora_inicio.diff(moment(conferencia.hora_fin,"YYYY-MM-DDThh:mm:ssZ").add(12,'hours')));
          }else{
            duration = moment.duration(moment().diff(moment(conferencia.hora_inicio,"YYYY-MM-DDThh:mm:ssZ").add(12,'hours')));
          }
          conferencia.transcurrido = duration.humanize()
         console.log("duration",duration)
       }
       console.log(conferencia)
      }
    }
    // console.log("this.ListadoDeConferenciasPorActividad",this.ListadoDeConferenciasPorActividad)
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
}


	ListasDeConferencias(){
		 this._peticiones.GetConferenciasPorActividad(this.actividad.id).subscribe(
      response => {
        this._funtions.blockUIO().stop()
        console.log("sdfkjdsjfjdsfj",response.data);
        if (response.info) {
          // console.log("SDFKJDSJFJDSFJDENTRO",response.data);
           this.ListadoDeConferenciasPorActividad = response.data;
           // this.calcularTiempoTrasncurrido()
          let t= Observable.interval(1000*3).takeUntil(this.onDestroy$);
          t.subscribe(i => this.calcularTiempoTrasncurrido());
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
