import { Component, OnInit,OnDestroy } from '@angular/core';
import { RouterModule, Router ,  ActivatedRoute} from '@angular/router';
import {FuncionesService} from '../../services/funciones.service';
import {PeticionesService} from '../../services/peticiones.service';

@Component({
  selector: 'app-list-conferencias',
  templateUrl: './list-conferencias.component.html',
  styleUrls: ['./list-conferencias.component.css']
})
export class ListConferenciasComponent implements OnInit,OnDestroy {
	ListadoDeConferenciasPorActividad:any[];
	actividad;
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
	ngOnDestroy(){

	}
	
	ngOnInit() {
		this.ListasDeConferencias();
	}

	ListasDeConferencias(){
		 this._peticiones.GetConferenciasPorActividad(this.actividad.id).subscribe(
      response => {
        this._funtions.blockUIO().stop()
        console.log("sdfkjdsjfjdsfj",response.data);
        if (response.info) {
          // console.log("SDFKJDSJFJDSFJDENTRO",response.data);
           this.ListadoDeConferenciasPorActividad = response.data;
        }
        //   this._funtions.Toast("success", "success", response.message);
        //   this.OnHIde();
        //   // this._router.navigate(['/home']);
        // }else
        //   this._funtions.Toast("error", "error",this._funtions.sacarText(response.error || response.message));

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
