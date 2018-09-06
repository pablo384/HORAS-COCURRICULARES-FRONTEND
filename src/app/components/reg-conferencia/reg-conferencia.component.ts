import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import {FuncionesService} from '../../services/funciones.service';
import {PeticionesService} from '../../services/peticiones.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reg-conferencia',
  templateUrl: './reg-conferencia.component.html',
  styleUrls: ['./reg-conferencia.component.css']
})
export class RegConferenciaComponent implements OnInit {
  formConferencia:FormGroup;
	Inpdisplay: boolean;
  formPerson: FormGroup;
  	// @Output() public Outdisplay = new EventEmitter<boolean>();
	date8: Date;
	dateValue: Date;
  porcentaje_default:any[];
  constructor(private fb: FormBuilder,private _router: Router,private _funtions: FuncionesService, private _peticiones :PeticionesService) { 
  }

  ngOnInit() {
    this.porcentaje_default =[{name:"50%",value:50},{name:"60%",value:60},{name:"70%",value:70},{name:"80%",value:80},{name:"90%",value:90},{name:"100%",value:100}];
    this.Inpdisplay = true;
    this.createForm();
  }

  OnHIde(){
    // this.formPerson.reset();
    this.Inpdisplay = false;
    this._router.navigate(["/"]);
    // this.Outdisplay.emit(false);
  }



  createForm(){
    this.formConferencia=this.fb.group({
      titulo:'',
      descripcion:'',
      hora_inicio:new Date(),
      duracion:'',
      dia_de_presentacion:"",
      porcentaje_horas_validas:""
    })
  }
  onSubmit(){
    console.log("formConferencia",this.formConferencia.value)
  }
}
