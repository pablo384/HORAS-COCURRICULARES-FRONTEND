import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import {FuncionesService} from '../../services/funciones.service';
import {PeticionesService} from '../../services/peticiones.service';

@Component({
  selector: 'app-reg-verificador',
  templateUrl: './reg-verificador.component.html',
  styleUrls: ['./reg-verificador.component.css']
})
export class RegVerificadorComponent implements OnInit {
	@Input() Inpdisplay: boolean;
	formPerson: FormGroup;
  id;
  datosCurrent;
	constructor(private aroute:ActivatedRoute,private fb: FormBuilder,private _router: Router, private _funtions: FuncionesService, private _peticiones :PeticionesService) { 
    this.aroute.params.subscribe( params => {
      console.log('params["conferencia"]',params);
          this.id = params["id"]
      }
    );

  }

	ngOnInit() {
    this.Inpdisplay = true;
		this.createForm()
    if(this.id){
      this.getVerifcador()
    }
    
	}
	
	OnHIde(){
    let uri="/verificadores";
    if(this.id!= null){
      uri = "verificadores";
    }
    this.formPerson.reset();
    this.Inpdisplay = false;
    this._router.navigate([uri]); 
    // this._funtions.backRoute()
  	}

  getVerifcador(){
    this._funtions.blockUIO().start()
    this._peticiones.GetVerifidor(this.id).subscribe(
      response => {
        this._funtions.blockUIO().stop()
        console.log(response);
        if (response.info) {
          this.datosCurrent = response.data;
          this.createForm(response.data)
        }else
          this._funtions.Toast("error", "error",this._funtions.sacarText(response.error));

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

  createForm(a={nombres:'',apellidos:'',direccion:'',cedula:'',email:'',telefono:'',usuario:'',password:''}){
    this.formPerson = this.fb.group({
      nombres: [a.nombres, Validators.required],
      apellidos: [a.apellidos, Validators.required],
      direccion: a.direccion,
      cedula:a.cedula,
      email:a.email,
      telefono:a.telefono,
      usuario:[a.usuario, Validators.required],
      tipo:'V',
      clave:[a.password, Validators.compose([Validators.required, Validators.minLength(4)])],
      claveConfirm:[a.password, Validators.compose([Validators.required, Validators.minLength(4)])]
    });
  }

  onSubmit(){
    let value = JSON.parse(JSON.stringify(this.formPerson.value));
    let cNameAction = "crearEstudiante";
    if (this.id!= null){
      cNameAction ="ActualizarVerificador";
      value.id = this.id;
      value.id_usuario = this.datosCurrent.id;
    }
    console.log("value",value,"cNameAction",cNameAction)
    if (value.clave == value.claveConfirm){
      this._funtions.blockUIO().start()
      this._peticiones[cNameAction](value,this.id).subscribe(
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
    }else{
      this._funtions.Toast("error","error","Contraseñas no coinciden")
    }
  }

}
