import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-actividades',
  templateUrl: './list-actividades.component.html',
  styleUrls: ['./list-actividades.component.css']
})
export class ListActividadesComponent implements OnInit {
  ListadoDeActividades:any[];
  constructor() {
  	this.ListadoDeActividades = [
  		{id:1,titulo:"Seminario 1",fecha_inicio:"101212",fecha_fin:"123213"},
  		{id:2,titulo:"Administración de Recursos",fecha_inicio:"101212",fecha_fin:"123213"},
  		{id:3,titulo:"TIC",fecha_inicio:"101212",fecha_fin:"123213"},
  	]
   }

  ngOnInit() {
  }

}
