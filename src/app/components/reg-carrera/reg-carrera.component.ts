import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
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
	
	@Input() Inpdisplay: boolean;
	@Output() public Outdisplay = new EventEmitter<boolean>();
  constructor(private fb: FormBuilder,private _funtions: FuncionesService, private _peticiones :PeticionesService) { }

  ngOnInit() {
  	this.createForm();
  }

  createForm(){
  	this.formCarrera=this.fb.group({
  		nombre:'',
  		abreviatura:''
  	})
  }

  OnHIde(){
    this.Outdisplay.emit(false);
  }

  onSubmit(){
    this._funtions.blockUIO().start()
  	this._peticiones.crearCarrera(this.formCarrera.value).subscribe(
      response => {
        this._funtions.blockUIO().stop()
        console.log(response);
        if (response.info) {
          this._funtions.Toast("success", "success", response.message);
          this.Outdisplay.emit(false);
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
