import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { RouterModule, Router ,ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {FuncionesService} from '../../services/funciones.service';
import {PeticionesService} from '../../services/peticiones.service';
@Component({
  selector: 'app-ponchar-asistencia',
  templateUrl: './ponchar-asistencia.component.html',
  styleUrls: ['./ponchar-asistencia.component.css']
})
export class PoncharAsistenciaComponent implements OnInit {
	formAsistencia:FormGroup;
	@Output() public Outdisplay = new EventEmitter<boolean>();
	@Input() public Inpdisplay;
	@Input() public InpDatos;
	  constructor(private fb: FormBuilder,private _router: Router,private aroute:ActivatedRoute,private _funtions: FuncionesService, private _peticiones :PeticionesService) {
	  	// this.aroute.queryParams.subscribe( params => {
    // 		console.log('params["conferencia"]',params);
    //     		// this.datos = JSON.parse( params["datos"] );
    // 		});
    
	  }

	ngOnInit() {
		this.Outdisplay.emit(false); //estaba true
		console.log("this.Inpdisplay ",this.Inpdisplay)
		console.log("InpDatos ",this.InpDatos)
		// this.createForm();
	}

	enviarDatos(){
		let value = {};
		
		if(!this.InpDatos.entrada){
			value = {
			  entrada: false,
			  id_asistencia: this.InpDatos.asistencia[this.InpDatos.asistencia.length-1].id
			}
		}else{
			value = {
			entrada: this.InpDatos.entrada,
			id_estudiante_carrera: this.InpDatos.id_estudiante_carrera,
			id_conferencia_a_c: this.InpDatos.cod
			}	
		}

		console.log("enviarDatos value ",value)
		this._funtions.blockUIO().start()
    this._peticiones.crearAsistencia(value).subscribe(
      response => {
        this._funtions.blockUIO().stop()
        console.log("enviarDatos",response);
        if(response.info){
     			this._funtions.Toast("success","Info",this._funtions.sacarText(response.message));
        }else{
          this._funtions.Toast("error","Error",this._funtions.sacarText(response.error ||  response.message));
        }
        this.OnHIde()
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

	// createForm(){
	// 	this.formAsistencia=this.fb.group({
	// 		nombre:'',
	// 		abreviatura:''
	// 	})
	// }

	OnHIde(){
		// this.enviarDatos();
		this.Outdisplay.emit(false);
		
		// this._router.navigate(["/list_asistencia"]);
		// this.Outdisplay.emit(false);
	}

}
