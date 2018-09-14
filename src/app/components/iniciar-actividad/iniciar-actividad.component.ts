import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-iniciar-actividad',
  templateUrl: './iniciar-actividad.component.html',
  styleUrls: ['./iniciar-actividad.component.css']
})
export class IniciarActividadComponent implements OnInit {
	formActividad:FormGroup
	Inpdisplay: boolean;
  	
  	constructor(private fb: FormBuilder,private _router: Router) { }

 	ngOnInit() {
	    this.Inpdisplay = true;
	  	this.createForm();
  	}
	createForm(){
		this.formActividad = this.fb.group({
  		nombre:'',
  		abreviatura:''
  	})
	}

	 OnHIde(){
		this.formActividad.reset();
		this.Inpdisplay = false;
		this._router.navigate(["/"]);
		// this.Outdisplay.emit(false);
	}

}
