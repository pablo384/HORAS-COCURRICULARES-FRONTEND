import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-reg-verificador',
  templateUrl: './reg-verificador.component.html',
  styleUrls: ['./reg-verificador.component.css']
})
export class RegVerificadorComponent implements OnInit {
	@Input() Inpdisplay: boolean;
	formPerson: FormGroup;
	constructor(private fb: FormBuilder,private _router: Router) { }

	ngOnInit() {
    this.Inpdisplay = true;
		this.createForm()
	}
	
	OnHIde(){
      this.formPerson.reset();
      this.Inpdisplay = false;
      this._router.navigate(["/"]);
    	// this.Outdisplay.emit(false);
  	}

  	createForm(){
  	this.formPerson = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      direccion: '',
      cedula:'',
      email:'',
      carrera:'',
      telefono:'',
      usuario:'',
      matricula:'',
      tipo:'E',
      carnet:'',
      clave:'',
      claveConfirm:''
    });
  }

}
