import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/primeng'
@Component({
  selector: 'app-reg-actividad',
  templateUrl: './reg-actividad.component.html',
  styleUrls: ['./reg-actividad.component.css']
})
export class RegActividadComponent implements OnInit {

	@Input() Inpdisplay: boolean;
  	@Output() public Outdisplay = new EventEmitter<boolean>();
	date8: Date;
	cars: SelectItem[];
	selectedCars1: string[] = [];
    selectedCars2: string[] = []

    cities: SelectItem[];
    carreras: SelectItem[];
    selectedCities: string[];
    selectedCarreras: string[];


	constructor() { 
		this.cars = [
	        {label: 'avatar', value: 'avatar1'},
	        {label: 'avatar', value: 'avatar2'},
	        {label: 'avatar', value: 'avatar3'},
	        {label: 'avatar', value: 'avatar4'},
	        {label: 'avatar', value: 'avatar5'},
	        {label: 'avatar', value: 'avatar6'},
	        {label: 'avatar', value: 'avatar6'},
	        {label: 'avatar', value: 'avatar7'},
	        {label: 'avatar', value: 'avatar8'},
	        {label: 'avatar', value: 'avatar9'}
	    ];
	    this.carreras = [
	        {label: 'ISC', value:{id:1,name:'ISC',code:'ISC'}},
	        {label: 'ADM', value:{id:2,name:'ADM',code:'ADM'}},
	        {label: 'MED', value:{id:3,name:'MED',code:'MED'}},
	        {label: 'INC', value:{id:4,name:'INC',code:'INC'}},
	        {label: 'IIN', value:{id:5,name:'IIN',code:'IIN'}},
	        {label: 'DER', value:{id:6,name:'DER',code:'DER'}},
	        {label: 'ARQ', value:{id:7,name:'ARQ',code:'ARQ'}},
	        {label: 'BIO', value:{id:8,name:'BIO',code:'BIO'}}
	    ];
		this.cities = [
		        {label:'Select City', value:null},
		        {label:'New York', value:{id:1, name: 'New York', code: 'NY'}},
		        {label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}},
		        {label:'London', value:{id:3, name: 'London', code: 'LDN'}},
		        {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
		        {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}},
		        {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}}

		    ];
	}

	 OnHIde(){
	    this.Outdisplay.emit(false);
	 }

	ngOnInit() {
	}

}
