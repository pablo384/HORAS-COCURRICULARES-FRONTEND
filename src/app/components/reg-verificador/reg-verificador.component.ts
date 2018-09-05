import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-reg-verificador',
  templateUrl: './reg-verificador.component.html',
  styleUrls: ['./reg-verificador.component.css']
})
export class RegVerificadorComponent implements OnInit {
	@Input() Inpdisplay: boolean;
	@Output() public Outdisplay = new EventEmitter<boolean>();
	formPerson: FormGroup;
	constructor(private fb: FormBuilder) { }

	ngOnInit() {
		this.createForm()
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

}
