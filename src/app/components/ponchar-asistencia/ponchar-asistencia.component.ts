import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { RouterModule, Router ,ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-ponchar-asistencia',
  templateUrl: './ponchar-asistencia.component.html',
  styleUrls: ['./ponchar-asistencia.component.css']
})
export class PoncharAsistenciaComponent implements OnInit {
	formAsistencia:FormGroup;
	@Output() public Outdisplay = new EventEmitter<boolean>();
	@Input() public Inpdisplay;
	@Input() public InpDatos;
	  constructor(private fb: FormBuilder,private _router: Router,private aroute:ActivatedRoute) {
	  	// this.aroute.queryParams.subscribe( params => {
    // 		console.log('params["conferencia"]',params);
    //     		// this.datos = JSON.parse( params["datos"] );
    // 		});
    
	  }

	ngOnInit() {
		this.Outdisplay.emit(false); //estaba true
		console.log("this.Inpdisplay ",this.Inpdisplay)
		console.log("InpDatos ",this.InpDatos)
		this.createForm();
	}

	createForm(){
		this.formAsistencia=this.fb.group({
			nombre:'',
			abreviatura:''
		})
	}

	OnHIde(){
		this.Outdisplay.emit(false);
		this.formAsistencia.reset();
		// this._router.navigate(["/list_asistencia"]);
		// this.Outdisplay.emit(false);
	}

}
