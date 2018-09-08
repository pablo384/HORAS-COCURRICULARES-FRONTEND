import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { RouterModule, Router ,ActivatedRoute} from '@angular/router';
import {FuncionesService} from '../../services/funciones.service';
import {PeticionesService} from '../../services/peticiones.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from "moment"
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
  actividad:string;
  horas_default:any[];
  constructor(private aroute:ActivatedRoute,private fb: FormBuilder,private _router: Router,private _funtions: FuncionesService, private _peticiones :PeticionesService) { 
    this.aroute.queryParams.subscribe( params => {
      console.log('params["actividad"]',params);
          this.actividad = JSON.parse( params["id_actividad"] );
      }
   );
    // this.actividad= '1';
  }

  ngOnInit() {
    this.porcentaje_default =[{name:"50%",value:50},{name:"60%",value:60},{name:"70%",value:70},{name:"80%",value:80},{name:"90%",value:90},{name:"100%",value:100}];
    this.horas_default =[{name:"0:15",value:"0:15"}];
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
      titulo:['', Validators.required],
      descripcion:'',
      hora_inicio:[new Date(), Validators.required],
      duracion:['0000', Validators.required],
      dia_de_presentacion:[new Date(), Validators.required],
      porcentaje_horas_validas:['', Validators.required]
    })
  }
  onSubmit(){
    let value = JSON.parse(JSON.stringify(this.formConferencia.value))
    value.hora_inicio = moment(value.hora_inicio).format("HH:MM:SS")
    value.dia_de_presentacion = moment(value.dia_de_presentacion).format("YYYY/MM/DD")
    value.porcentaje_horas_validas = value.porcentaje_horas_validas.value
    value.actividad = this.actividad;
    console.log("formConferencia",JSON.stringify(value))
  }
}
