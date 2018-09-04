import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {FuncionesService} from '../../services/funciones.service';
import {PeticionesService} from '../../services/peticiones.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-reg-estudiante',
  templateUrl: './reg-estudiante.component.html',
  styleUrls: ['./reg-estudiante.component.css']
})
export class RegEstudianteComponent implements OnInit {
	@Input() Inpdisplay: boolean;
  @Output() public Outdisplay = new EventEmitter<boolean>();
  val5: string;
  carreras:Array<Object>;
	formPerson: FormGroup;
  filteredCarreras: any[];
  constructor(private fb: FormBuilder,private _funtions: FuncionesService, private _peticiones :PeticionesService) { 
    this._funtions.allCarreras((carreras) =>{
      this.carreras = carreras.data
    }) 
  }
 
  ngOnInit() {
  	this.createForm();
  }

  OnHIde(){
    this.Outdisplay.emit(false);
  }

  filterCarreras(event) {
        this.filteredCarreras = [];
        for(let i = 0; i < this.carreras.length; i++) {
            let brand = this.carreras[i];
            if(brand["nombre"].toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredCarreras.push(brand);
            }
        }
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
  onSubmit(){
    this._funtions.blockUIO().start()
    this._peticiones.crearCarrera(this.formPerson.value).subscribe(
      response => {
        this._funtions.blockUIO().stop()
        console.log(response);
        if (response.info) {
          this._funtions.Toast("success", "success", response.message);
          this.OnHIde();
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

  	console.log("onSubmit ",JSON.stringify(this.formPerson.value))
  }
}
