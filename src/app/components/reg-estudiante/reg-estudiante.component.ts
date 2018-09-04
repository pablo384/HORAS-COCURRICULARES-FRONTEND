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
	formPerson: FormGroup;
  constructor(private fb: FormBuilder,private _funtions: FuncionesService, private _peticiones :PeticionesService) { }

  ngOnInit() {
  	this.createForm();
  }

  OnHIde(){
    this.Outdisplay.emit(false);
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
  	console.log("onSubmit ",this.formPerson.value)
  }
}
