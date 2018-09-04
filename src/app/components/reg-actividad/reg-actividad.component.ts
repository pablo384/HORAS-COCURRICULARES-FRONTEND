import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/primeng'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {FuncionesService} from '../../services/funciones.service';
import {PeticionesService} from '../../services/peticiones.service';
import * as moment from "moment"
@Component({
  selector: 'app-reg-actividad',
  templateUrl: './reg-actividad.component.html',
  styleUrls: ['./reg-actividad.component.css']
})
export class RegActividadComponent implements OnInit {
	formActividad:FormGroup;
	@Input() Inpdisplay: boolean;
  @Output() public Outdisplay = new EventEmitter<boolean>();
	date8: Date;
	minDate: Date;
    carreras: SelectItem[];
    selectedCities: string[];
    selectedCarreras: string[];


	constructor(private fb: FormBuilder,private _funtions: FuncionesService, private _peticiones :PeticionesService) { 
	  this.allCarreras()
	  this.minDate = new Date()
	}

	ngOnInit() {
		this.createForm()
	}

	createForm(){
  	this.formActividad=this.fb.group({
  		titulo:"",
			fecha_inicio:new Date(),
			fecha_finalizacion:new Date(),
			carreras: []
  	})
  }

	crearActividad(){
		let value                = this.formActividad.value
		// value.fecha_inicio       = moment(value.fecha_inicio).format("YYYY-MM-DD")
		// value.fecha_finalizacion = moment(value.fecha_finalizacion).format("YYYY-MM-DD")
		console.log("formActividad ",this.formActividad.value )
		// return;
		this._funtions.blockUIO().start()
  	this._peticiones.crearActividad(value).subscribe(
      response => {
        this._funtions.blockUIO().stop()
        console.log(response); 				
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
	allCarreras(){
		this.carreras =[]
		this._funtions.blockUIO().start()
  	this._peticiones.GetAllCarrera().subscribe(
      response => {
        this._funtions.blockUIO().stop()
        console.log(response);
        for (var i = 0; i < response.data.length; ++i) {
        	let carrera = response.data[i];
        	this.carreras.push({label:carrera.nombre,value:carrera.id})
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
	

	 OnHIde(){
	    this.Outdisplay.emit(false);
	 }

	
}
