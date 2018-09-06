import { Component, OnInit } from '@angular/core';
import {FuncionesService} from '../../services/funciones.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayCarrera      :boolean;
  displayEstudiante   :boolean;
  displayActividad    :boolean;
  displayConferencia  :boolean;
  displayConferencista:boolean;
  displayVerificador  :boolean;

  ListadoDeConferencias:any[];

  constructor(private _funtions: FuncionesService) {
    this.displayCarrera       = false;
    this.displayEstudiante    = false;
    this.displayActividad     = false;
    this.displayConferencia   = false;
    this.displayConferencista = false;
    this.displayVerificador   = false;
    this.ListadoDeConferencias = [
      {'actividad':'X','conferencia':'Y','estado':'A'},
      {'actividad':'X','conferencia':'Y','estado':'A'},
      {'actividad':'X','conferencia':'Y','estado':'A'},
      {'actividad':'X','conferencia':'Y','estado':'A'},
      {'actividad':'X','conferencia':'Y','estado':'A'},
      {'actividad':'X','conferencia':'Y','estado':'A'}
    ]


  }

  ngOnInit() {
  }

  showAndHideCarrera(display:boolean){
  	this.displayCarrera =display;// = display;
  	console.log("showAndHideCarrera display",display);
  	// return this.displayCarrera;
  }

  showAndHideEstudiante(display:boolean){
    this.displayEstudiante =display;// = display;
    console.log("displayEstudiante display",display);
  }

  showAndHideActividad(display:boolean){
    this.displayActividad =display;// = display;
    console.log("displayActividad display",display);
  }

  showAndHideConferencia(display:boolean){
    this.displayConferencia =display;// = display;
    console.log("displayConferencia display",display);
  }
  showAndHideConferencista(display:boolean){
    this.displayConferencista =display;// = display;
    console.log("displayConferencista display",display);
  }
  showAndHideVerificador(display:boolean){
    this.displayVerificador =display;// = display;
    // console.log("displayConferencista display",display);
  }

}
