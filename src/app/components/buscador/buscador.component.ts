import { Component,OnInit,Input,Output,EventEmitter } from '@angular/core';
import * as moment from "moment"
@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
	@Input() fn;
	fecha_inicio :Date
	fecha_fin :Date
	@Input() placeholder:string = "Matircula, Nombre, Apellido ,Usuario";
	constructor() { }

	ngOnInit() {
		console.log(this.fn)
	}
	buscar(){
		this.fn(moment(this.fecha_inicio).format("YYYY-MM-DD"), moment(this.fecha_fin).format("YYYY-MM-DD") );
	}

	onKeydown(event) {
  	this.buscar()	
	}

}
