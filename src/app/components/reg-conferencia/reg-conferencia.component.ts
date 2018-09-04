import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reg-conferencia',
  templateUrl: './reg-conferencia.component.html',
  styleUrls: ['./reg-conferencia.component.css']
})
export class RegConferenciaComponent implements OnInit {

	@Input() Inpdisplay: boolean;
  	@Output() public Outdisplay = new EventEmitter<boolean>();
	date8: Date;
	dateValue: Date;
  constructor() { }

  ngOnInit() {
  }

   OnHIde(){
    this.Outdisplay.emit(false);
  }

}
