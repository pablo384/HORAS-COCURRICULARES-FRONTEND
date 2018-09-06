import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
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
	constructor(private fb: FormBuilder,private _router: Router, private _funtions: FuncionesService, private _peticiones :PeticionesService) { }

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
      telefono:'',
      usuario:['', Validators.required],
      tipo:'V',
      clave:['', Validators.compose([Validators.required, Validators.minLength(4)])],
      claveConfirm:['',Validators.compose([Validators.required, Validators.minLength(4)])]
    });
  }
  onSubmit(){
    let value = this.formPerson.value
    // value.carrera = value.carrera.id
    if (value.clave == value.claveConfirm){
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
    }else{
      this._funtions.Toast("error","error","Contraseñas no coinciden")
    }
  }

}
