import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reg-conferencista',
  templateUrl: './reg-conferencista.component.html',
  styleUrls: ['./reg-conferencista.component.css']
})
export class RegConferencistaComponent implements OnInit {

	@Input() Inpdisplay: boolean;
  	@Output() public Outdisplay = new EventEmitter<boolean>();
	constructor() { }

	ngOnInit() {
	}


	 OnHIde(){
	    this.Outdisplay.emit(false);
	 }

}
