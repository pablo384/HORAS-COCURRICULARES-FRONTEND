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
  id_actividad;
  private onDestroy$ = new Subject<void>();

	constructor(private aroute:ActivatedRoute,private _funtions: FuncionesService, private _peticiones :PeticionesService) { 
	  // this.aroute.queryParams.subscribe( params => {
  	// 	console.log('params["actividad"]',params);
   //      if(params["actividad"] != undefined){
   //        this.actividad = JSON.parse( params["actividad"] );
   //      }
   //      if(params["id_actividad"] != undefined){
   //        this.id = params["id_actividad"];
   //      }
   //      console.log('params["actividad"]',this.actividad);
  	// 	}
   //  );

    this.aroute.params.subscribe( params => {
      console.log('RegConferenciaComponent ',params);
      // this.id = params["id"]
      this.id_actividad = params["id_actividad"]
    });

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
         // console.log("duration",duration)
       }
       // console.log(conferencia)
      }
    }
    // console.log("this.ListadoDeConferenciasPorActividad",this.ListadoDeConferenciasPorActividad)
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
}
  

	EliminarConferencia(index,id_conferencia,id_conferencista_por_actividad){

    console.log("id_conferencia,id_conferencista_por_actividad",id_conferencia,id_conferencista_por_actividad)
     this._peticiones.EliminarConferencia(id_conferencia,id_conferencista_por_actividad).subscribe(
      response => {
        this._funtions.blockUIO().stop()
        console.log("sdfkjdsjfjdsfj",response);
        if (response.info) {
          this.ListadoDeConferenciasPorActividad.splice(index, 1);
          this._funtions.Toast("success","Eliminada",response.message);
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
  ListasDeConferencias(){
    console.log("ListasDeConferencias(this.actividad && this.actividad.id) || this.id", this.id_actividad)
     this._peticiones.GetConferenciasPorActividad( this.id_actividad).subscribe(
		 // this._peticiones.GetConferenciasPorActividad(this.a).subscribe(
      response => {
        this._funtions.blockUIO().stop()
        console.log("sdfkjdsjfjdsfj",response.data);
        if (response.info) {
          // console.log("SDFKJDSJFJDSFJDENTRO",response.data);
           this.ListadoDeConferenciasPorActividad = response.data;
           this.calcularTiempoTrasncurrido() 
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
