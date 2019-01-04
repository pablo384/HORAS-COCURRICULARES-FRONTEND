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
	date8: Date;
	dateValue: Date;
  porcentaje_default:any[];
  actividad:string;
  conferencista:string;
  ListadoConferencistas: any[];
  id_conferencia;
  constructor(private aroute:ActivatedRoute,private fb: FormBuilder,private _router: Router,private _funtions: FuncionesService, private _peticiones :PeticionesService) { 
    this.aroute.params.subscribe( params => {
      this.id_conferencia = params["id"]
    });
    if(this._router.url.split('/').length >0 &&  this._router.url.split('/')[1] != undefined ){
      this.actividad= this._router.url.split('/')[1]
    }

    this.porcentaje_default = [];
    for(let i = 50; i <=100; i=i+5) {
      this.porcentaje_default.push({name:i+"%",value:i})
    }

    this.Inpdisplay = true;
    this.listadoDeConferencistas();
    this.createForm();
  }

  ngOnInit() {
  }

  OnHIde(){
    // this.formPerson.reset();
    this.Inpdisplay = false;
    this._router.navigate(["/cuatrimestres"]);
    // this.Outdisplay.emit(false);
  }

  listadoDeConferencistas() {
    // console.log(this.loginForm.value);
    this._funtions.blockUIO().start()
    this._peticiones.GetConferencistas().subscribe(
      response => {
         this._funtions.blockUIO().stop()
        console.log('response',response);
        this.ListadoConferencistas = response.data;
        if(this.id_conferencia != undefined){
          this.Conferencia();
        }
      },
      error => {
        let resultado;
        if (error.error && error.status !== 0) {
          resultado = this._funtions.sacarText(error.error);
        } else {
          resultado = error.error.message;
        }
        console.log(error.error.message)
        this._funtions.Toast("error","Error",resultado);

        this._funtions.blockUIO().stop(); 
      }
    );

  }


  Conferencia() {
    // console.log(this.loginForm.value);
    this._funtions.blockUIO().start()
    this._peticiones.getConferencia(this.id_conferencia).subscribe(
      response => {
        this._funtions.blockUIO().stop()
        console.log('getConferencia response',response);
        response["data"].hora_inicio = moment(response["data"].hora_inicio).toDate();
        response["data"].dia_de_presentacion = moment(response["data"].dia_de_presentacion).toDate();
        this.createForm(response["data"])
      },
      error => {
        let resultado;
        if (error.error && error.status !== 0) {
          resultado = this._funtions.sacarText(error.error);
        } else {
          resultado = error.error.message;
        }
        console.log(error.error.message)
        this._funtions.Toast("error","Error",resultado);

        this._funtions.blockUIO().stop(); 
      }
    );

  }



  createForm(
    a={
      titulo:'',
      descripcion:'',
      hora_inicio:new Date(),
      dura_estimada:'',
      dia_de_presentacion:new Date(),
      porciento_horas_validas:0,
      id_persona_conferencista:''
    }
    ){
    // let hor
    this.formConferencia=this.fb.group({
      titulo:[a.titulo, Validators.required],
      descripcion:a.descripcion,
      hora_inicio:[a.hora_inicio, Validators.required],
      dura_estimada:[a.dura_estimada, Validators.compose([Validators.pattern("([0-9]+):([0-5]?[0-9]):([0-5]?[0-9])"),Validators.required])],
      dia_de_presentacion:[a.dia_de_presentacion,Validators.required],
      porciento_horas_validas:[a.porciento_horas_validas, Validators.required],
      id_persona_conferencista:[a.id_persona_conferencista,Validators.required]
    })
    // this.formConferencia.controls.porciento_horas_validas.patchValue(90);
    this._funtions.actionsOnRoute(this.formConferencia.controls);
  }


  
  onSubmit(){
    console.log("console.log(this.formConferencia.value)",this.formConferencia.value)
    let value = JSON.parse(JSON.stringify(this.formConferencia.value))
    let duracion = value.dura_estimada.replace(":","")
    duracion = duracion.replace(":","")
    if(parseInt(duracion)>0){
      value.hora_inicio              = moment(value.hora_inicio).format("HH:MM")
      value.dia_de_presentacion      = moment(value.dia_de_presentacion).format("YYYY-MM-DD")
      value.porciento_horas_validas  = value.porciento_horas_validas.value
      value.id_persona_conferencista = value.id_persona_conferencista.id
      value.actividad                = this.actividad;
      console.log("onSubmit ",JSON.stringify(value))
      this._peticiones.crearConferencia(value).subscribe(
        response => {
          this._funtions.blockUIO().stop()
          console.log('response',response);
          if(response["info"]){

            this._funtions.Toast("success", "success", response.message);
            this.OnHIde();
          }else {
            this._funtions.Toast("error","Error",this._funtions.sacarText(response.error))
          }
        },
        error => {
          let resultado;
          if (error.error && error.status !== 0) {
            resultado = this._funtions.sacarText(error.error);
          } else {
            resultado = error.error.message;
          }
          console.log(error.error)
          this._funtions.Toast("error","Error",resultado);

          this._funtions.blockUIO().stop(); 
        }
      );
    }else
      this._funtions.Toast("error","Error","Duración de la actividad incorrecta!");
    // value.conferencista = this.conferencista;
    // console.log("formConferencia",JSON.stringify(value))
  }
}
