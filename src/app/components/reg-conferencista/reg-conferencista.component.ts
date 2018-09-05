import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-reg-conferencista',
  templateUrl: './reg-conferencista.component.html',
  styleUrls: ['./reg-conferencista.component.css']
})
export class RegConferencistaComponent implements OnInit {

	Inpdisplay: boolean;
	formPerson: FormGroup;
  	// @Output() public Outdisplay = new EventEmitter<boolean>();
	constructor(private fb: FormBuilder,private _router: Router) { }

	ngOnInit() {
		this.Inpdisplay = true;
	}


	 OnHIde(){
	 	this.formPerson.reset();
	    this.Inpdisplay = false;
	    this._router.navigate(["/"]);
	    // this.Outdisplay.emit(false);
	 }

}
