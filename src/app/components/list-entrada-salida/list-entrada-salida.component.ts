import { Component, OnInit,Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-list-entrada-salida',
  templateUrl: './list-entrada-salida.component.html',
  styleUrls: ['./list-entrada-salida.component.css']
})
export class ListEntradaSalidaComponent implements OnInit {
@Input() public InpDatos;
  constructor() { }

  ngOnInit() {
  }
  momentDuration(arg) {
    return moment.duration(arg).humanize();
  }
}
