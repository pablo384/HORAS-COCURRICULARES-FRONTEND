import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {PeticionesService} from '../../services/peticiones.service';
import {FuncionesService} from '../../services/funciones.service';

@Component({
  selector: 'app-reg-conferencista',
  templateUrl: './reg-conferencista.component.html',
  styleUrls: ['./reg-conferencista.component.css']
})
export class RegConferencistaComponent implements OnInit {

	Inpdisplay: boolean;
	formPerson: FormGroup;
	constructor(private fb: FormBuilder,private _router: Router, private _funtions: FuncionesService, private _peticiones :PeticionesService) { }

	ngOnInit() {
		this.Inpdisplay = true;
		this.createForm();
	}
	createForm(){
  	this.formPerson = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      direccion: '',
      cedula:'',
      email:'',
      telefono:['', Validators.required],
      tipo:'C',
      cargo:"",
      trabajo:""
    });
  }

	OnHIde(){
		this.formPerson.reset();
	  this.Inpdisplay = false;
	  this._router.navigate(["/"]);
	}
	onSubmit(){
    let value = this.formPerson.value
    this._funtions.blockUIO().start()
    this._peticiones.crearEstudiante(value).subscribe(
      response => {
        this._funtions.blockUIO().stop()
        console.log(response);
        if (response.info) {
          this._funtions.Toast("success", "success", response.message);
          this.OnHIde();
          // this._router.navigate(['/home']);
        }else
          this._funtions.Toast("error", "error",this._funtions.sacarText(response.error || response.message));

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

  	console.log("onSubmit ",JSON.stringify(value))
  }
}
