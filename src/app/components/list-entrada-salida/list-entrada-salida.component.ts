import { Component, OnInit,Input } from '@angular/core';

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

}
