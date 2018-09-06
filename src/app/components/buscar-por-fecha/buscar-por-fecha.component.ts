import { Component,OnInit,Input,Output,EventEmitter } from '@angular/core';
import {PeticionesService} from '../../services/peticiones.service';
import {FuncionesService} from '../../services/funciones.service';
import * as moment from "moment"
@Component({
  selector: 'app-buscar-por-fecha',
  templateUrl: './buscar-por-fecha.component.html',
  styleUrls: ['./buscar-por-fecha.component.css']
})
export class BuscarPorFechaComponent implements OnInit {
	fecha_inicio :Date
	fecha_fin :Date
	@Input() fn;
	// @Output() public Outdisplay = new EventEmitter<boolean>();
	// @Output() fn;
  constructor(private _funtions: FuncionesService, private _peticiones :PeticionesService) { 

  	this.fecha_inicio  = new Date();
  	this.fecha_fin     = new Date();
  }

  ngOnInit() {
  	console.log(this.fn)
  }
  buscar(){
  	this.fn(moment(this.fecha_inicio).format("YYYY-MM-DD"), moment(this.fecha_fin).format("YYYY-MM-DD") );
  }
}
