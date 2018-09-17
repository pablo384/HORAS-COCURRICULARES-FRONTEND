import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { RouterModule, Router ,  ActivatedRoute} from '@angular/router';
import {FuncionesService} from '../../services/funciones.service';
import {PeticionesService} from '../../services/peticiones.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



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
  	this.createForm();
  }

  OnHIde(){
    this.formPerson.reset();
    this.Inpdisplay = false;
    if (this.routeBack != null){
      this._router.navigate(["/lista_actividades"]);
    }else
      this._router.navigate(["/"]);

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
  createForm(){
  	this.formPerson = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      direccion: '',
      cedula:'',
      email:'',
      carrera:['', Validators.required],
      telefono:'',
      usuario:['', Validators.required],
      matricula:['', Validators.required],
      tipo:'E',
      image:"",
      carnet:['',Validators.compose([Validators.required, Validators.minLength(16),Validators.maxLength(16)])],
      clave:['', Validators.compose([Validators.required, Validators.minLength(4)])],
      claveConfirm:['',Validators.compose([Validators.required, Validators.minLength(4)])]
    });
  }
  onSubmit(){
    let value = this.formPerson.value
    value.carrera = value.carrera.id
    if (value.clave == value.claveConfirm){
      this._funtions.blockUIO().start()
      this._peticiones.crearEstudiante(value).subscribe(
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