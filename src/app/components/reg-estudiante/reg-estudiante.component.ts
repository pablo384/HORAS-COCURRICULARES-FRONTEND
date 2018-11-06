import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { RouterModule, Router ,  ActivatedRoute} from '@angular/router';
import {FuncionesService} from '../../services/funciones.service';
import {PeticionesService} from '../../services/peticiones.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ListEstudiantesComponent} from '../list-estudiantes/list-estudiantes.component'


@Component({
  selector: 'app-reg-estudiante',
  templateUrl: './reg-estudiante.component.html',
  styleUrls: ['./reg-estudiante.component.css']
})
export class RegEstudianteComponent implements OnInit {
	Inpdisplay: boolean;
  // @Output() public Outdisplay = new EventEmitter<boolean>();
  val5: string;
  carreras:Array<Object>;
	formPerson: FormGroup;
  filteredCarreras: any[];
  routeBack;
  imgPerson;
  id;
  constructor(private aroute:ActivatedRoute,private fb: FormBuilder,private _router: Router, private _funtions: FuncionesService, private _peticiones :PeticionesService) { 
  
    this._funtions.allCarreras((carreras) =>{
      this.carreras = carreras.data
    })
    this.aroute.params.subscribe( params => 
      this.routeBack = params["router_back"]
     );
  }


  onFileChange(event) {
    console.log(event.files);
    const reader = new FileReader();
    if (event.files && event.files.length > 0) {
      const file = event.files[0];
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.formPerson.get('image').patchValue({
          name: file.name,
          type: file.type,
          data: reader.result.split(',')[1]
        });
        // this.doctor.image = this.doctorForm.value.image;
        // objeto imagen a enviar
        // console.log(this.doctorForm.get('userData.data.image').value)
        this.imgPerson = 'data:' + this.formPerson.get('image')
          .value.type + ';base64,' + this.formPerson.get('image')
          .value.data;
        // console.log(this.imgPerson);
        console.log(this.formPerson.value);
      };
      // // console.log(this.form.value);
    }
  }

  ngOnInit() {
    this.Inpdisplay = true;
     this.aroute.params.subscribe( params => {
      console.log('params["estudiante"]',params);
          this.id = params["id"]
      }
    );
  	this.createForm();
     if(this.id != undefined){
      this.getEstudiante()
    }
    // this.createForm();
  }

  getEstudiante(){
    let value = {id_persona:this.id}
    this._peticiones.getEstudiante(value).subscribe(
      response => {
        this._funtions.blockUIO().stop()
        console.log("getEstudiante",response.data);
        if (response.data.length >0) {
          let estudiante = response.data[0];
          let carrera = {nombres:estudiante.carrera,abreviatura:estudiante.carrera_abreviatura,horas_requeridas:estudiante.horas_requeridas,id:estudiante.id_estudiante_carrera}
          estudiante.carrera = carrera;
          estudiante.estado = estudiante.estado=="A"
          estudiante.carnet = estudiante.no_carnet;
          this.createForm(estudiante);    
          // this.estudiante = response.data;
        }
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


  OnHIde(){
    this.formPerson.reset();
    this.Inpdisplay = false;
    if (this.routeBack != null){
      this._router.navigate(["/actividades"]);
    }else{
      this._router.navigate(["/estudiantes"]);
    }

    ListEstudiantesComponent.returned.next(false);
    // this.Outdisplay.emit(false);
  }

  filterCarreras(event) {
        this.filteredCarreras = [];
        for(let i = 0; i < this.carreras.length; i++) {
            let brand = this.carreras[i];
            if(brand["abreviatura"].toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredCarreras.push(brand);
            }
        }
    }
  createForm(a= {nombres:'',apellidos:'',direccion:'',cedula:'',email:'',carrera:'',telefono:'',usuario:'',matricula:'',image:'',carnet:'',horas_concurriculares_acumuladas:null,estado:true,id_usuario:''}){
  	this.formPerson = this.fb.group({
      nombres: [a.nombres, Validators.required],
      apellidos: [a.apellidos, Validators.required],
      direccion: a.direccion,
      cedula:a.cedula,
      email:a.email,
      carrera:[a.carrera, Validators.required],
      telefono:a.telefono,
      usuario:[a.usuario, Validators.required],
      matricula:[a.matricula, Validators.required],
      tipo:'E',
      estado:a.estado,
      image:a.image,
      carnet:[a.carnet,Validators.compose([Validators.required, Validators.minLength(16),Validators.maxLength(16)])],
      clave:['1234'/*, Validators.compose([Validators.required, Validators.minLength(4)])*/],
      claveConfirm:['1234'/*,Validators.compose([Validators.required, Validators.minLength(4)])*/],
      horas_concurriculares_acumuladas:[a.horas_concurriculares_acumuladas],
      id_usuario:a.id_usuario
    });
    this._funtions.actionsOnRoute(this.formPerson.controls);
    // console.log(this.formPerson.controls)
  }
  onSubmit(){
    let value = JSON.parse(JSON.stringify(this.formPerson.value))
    let cNameAction = "crearEstudiante";

    if (this.id!= null){
      cNameAction ="ActualizarEstudiante";
      value.id_persona = this.id;
      // value.id_persona = this.id;
    }

    value.carrera = value.carrera.id
    if (value.clave == value.claveConfirm){
      value.estado = value.estado?"A":"I";
      
      console.log("value",value,"cNameAction",cNameAction)
      this._funtions.blockUIO().start()
      this._peticiones[cNameAction](value).subscribe(
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
