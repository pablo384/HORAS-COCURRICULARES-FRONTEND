import { Component, OnInit } from '@angular/core';
import {FuncionesService} from '../../services/funciones.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	displayCarrera :boolean;
  constructor(private _funtions: FuncionesService) {
  	this.displayCarrera = false;
  }

  ngOnInit() {
  }

  showAndHideCarrera(display:boolean){
  	this.displayCarrera =display;// = display;
  	console.log("showAndHideCarrera display",display);
  	// return this.displayCarrera;
  }
}
