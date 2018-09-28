import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import {FuncionesService} from '../../services/funciones.service';
import {PeticionesService} from '../../services/peticiones.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-reg-carrera',
  templateUrl: './reg-carrera.component.html',
  styleUrls: ['./reg-carrera.component.css']
})
export class RegCarreraComponent implements OnInit {
	formCarrera:FormGroup;
	id;
	Inpdisplay: boolean;
	// @Output() public Outdisplay = new EventEmitter<boolean>();
  constructor(private aroute:ActivatedRoute,private fb: FormBuilder,private _router: Router,private _funtions: FuncionesService, private _peticiones :PeticionesService) { }

  ngOnInit() {
    this.Inpdisplay = true;
    this.aroute.params.subscribe( params => {
      console.log('params["conferencia"]',params);
          this.id = params["id"]
      }
    );
    this.createForm();
    if(this.id != undefined){
      this.GetCarrera()
    }
  	
  }

  createForm(n='',ab='',hr=0){
  	this.formCarrera=this.fb.group({
  		nombre:n,
      abreviatura:ab,
  		horas_requeridas:hr
  	})
  }

  OnHIde(){
    let uri="/";
    if(this.id!= null){
      uri = "list_carreras";
    }
    this.formCarrera.reset();
    this.Inpdisplay = false;
    this._router.navigate([uri]);
 
  }


  GetCarrera(){
    this._funtions.blockUIO().start()
    this._peticiones.GetCarrera(this.id).subscribe(
      response => {
        this._funtions.blockUIO().stop()
        console.log(response);
        if (response.info) {
          this.createForm(response.data.nombre,response.data.abreviatura,response.data.horas_requeridas)
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
    // console.log("sdfdf",this.formCarrera.value)
  }

  onSubmit(){
    let cNameAction = "crearCarrera";
    let value = JSON.parse(JSON.stringify(this.formCarrera.value));
    if (this.id!= null){
      cNameAction ="ActualizarCarrera";
      value.id = this.id;
    }
    console.log("value",value,"cNameAction",cNameAction)
    this._funtions.blockUIO().start()
  	this._peticiones[cNameAction](value,this.id).subscribe(
      response => {
        this._funtions.blockUIO().stop()
        console.log(response);
        if (response.info) {
          this._funtions.Toast("success", "success", response.message);
          this.OnHIde();
          // this.Outdisplay.emit(false);
          // this._router.navigate(['/home']);
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
  	console.log("sdfdf",this.formCarrera.value)
  }
}
