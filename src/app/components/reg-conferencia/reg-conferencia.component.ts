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
  conferencista:string;
  horas_default:any[];
  ListadoConferencistas: string[] = ['Audi','BMW','Fiat','Ford','Honda','Jaguar','Mercedes','Renault','Volvo','VW'];
  filteredBrands: any[];
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

   filterBrands(event) {
        this.filteredBrands = [];
        for(let i = 0; i < this.ListadoConferencistas.length; i++) {
            let brand = this.ListadoConferencistas[i];
            if(brand.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredBrands.push(brand);
            }
        }
    }


    listadoDeConferencistas() {
    
    // console.log(this.loginForm.value);
    this._funtions.blockUIO().start()
    this._peticiones.GetConferencistas().subscribe(
      response => {
         this._funtions.blockUIO().stop()
        console.log('response',response);
        this.ListadoConferencistas = response.data;

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



  createForm(){
    this.formConferencia=this.fb.group({
      titulo:['', Validators.required],
      descripcion:'',
      hora_inicio:[new Date(), Validators.required],
      dura_estimada:['0000', Validators.required],
      dia_de_presentacion:[new Date(), Validators.required],
      porcentaje_horas_validas:['', Validators.required],
      conferencista:['',Validators.required]
    })
  }
  onSubmit(){
    let value = JSON.parse(JSON.stringify(this.formConferencia.value))
    value.hora_inicio = moment(value.hora_inicio).format("HH:MM:SS")
    value.dia_de_presentacion = moment(value.dia_de_presentacion).format("YYYY/MM/DD")
    value.porcentaje_horas_validas = value.porcentaje_horas_validas.value
    value.actividad = this.actividad;
    value.conferencista = this.conferencista;
    console.log("formConferencia",JSON.stringify(value))
  }
}
