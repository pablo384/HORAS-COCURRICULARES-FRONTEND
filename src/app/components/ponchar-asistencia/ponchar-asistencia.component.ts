import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-ponchar-asistencia',
  templateUrl: './ponchar-asistencia.component.html',
  styleUrls: ['./ponchar-asistencia.component.css']
})
export class PoncharAsistenciaComponent implements OnInit {
	formAsistencia:FormGroup;
	
	Inpdisplay: boolean;
	  constructor(private fb: FormBuilder,private _router: Router) { }

	ngOnInit() {
		this.Inpdisplay = true;
		this.createForm();
	}

	createForm(){
		this.formAsistencia=this.fb.group({
			nombre:'',
			abreviatura:''
		})
	}

	OnHIde(){
		this.formAsistencia.reset();
		this.Inpdisplay = false;
		this._router.navigate(["/list_asistencia"]);
		// this.Outdisplay.emit(false);
	}

}
