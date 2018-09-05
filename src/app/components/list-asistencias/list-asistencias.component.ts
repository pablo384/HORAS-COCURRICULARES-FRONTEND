import { Component, OnInit } from '@angular/core';
import { RouterModule, Router ,  ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-list-asistencias',
  templateUrl: './list-asistencias.component.html',
  styleUrls: ['./list-asistencias.component.css']
})
export class ListAsistenciasComponent implements OnInit {

	conferencia;
  	constructor(private aroute:ActivatedRoute) {
  	this.aroute.queryParams.subscribe( params => {
  		console.log('params["conferencia"]',params);
      		this.conferencia = JSON.parse( params["conferencia"] );
  		}
	);

  }

  ngOnInit() {
  }

}
