import { Component, OnInit } from '@angular/core';
import { RouterModule, Router ,  ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-list-conferencias',
  templateUrl: './list-conferencias.component.html',
  styleUrls: ['./list-conferencias.component.css']
})
export class ListConferenciasComponent implements OnInit {
	ListadoDeEstudiantes:any[];
	actividad;
	constructor(private aroute:ActivatedRoute) { 
		this.ListadoDeEstudiantes = [
	  		{id:1,titulo:"Encriptación",fecha_inicio:"101212",fecha_fin:"123213"},
	  		{id:2,titulo:"El mundo de Git",fecha_inicio:"101212",fecha_fin:"123213"},
	  		{id:3,titulo:"Hello Mundo",fecha_inicio:"101212",fecha_fin:"123213"},
	  	]
		  this.aroute.queryParams.subscribe( params => {
	  		console.log('params["actividad"]',params);
	      		this.actividad = JSON.parse( params["actividad"] );
	  		}
	     );
	}

	ngOnInit() {
	}

}
