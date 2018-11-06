import { Component,OnInit,Input,Output,EventEmitter } from '@angular/core';
import * as moment from "moment"
@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
	@Input() fn;
	@Input() disabled;
	texto_a_buscar:string;
	@Input() placeholder:string = "Matircula, Nombre, Apellido ,Usuario";
	constructor() {
		this.disabled= false;
	}

	ngOnInit() {
		console.log(this.fn)
	}
	buscar(){
		this.fn(this.texto_a_buscar);
		this.texto_a_buscar = "";
	}

	onKeydown(event) {
  	this.buscar()	
	}

}
