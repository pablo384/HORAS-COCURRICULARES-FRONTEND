import { Component, OnInit } from '@angular/core';
import { RouterModule, Router ,  ActivatedRoute} from '@angular/router';
import {FuncionesService} from '../../services/funciones.service';
import {PeticionesService} from '../../services/peticiones.service';
@Component({
  selector: 'app-detalle-conferencia',
  templateUrl: './detalle-conferencia.component.html',
  styleUrls: ['./detalle-conferencia.component.css']
})
export class DetalleConferenciaComponent implements OnInit {

  constructor(private _router: Router,private aroute:ActivatedRoute,private _funtions: FuncionesService, private _peticiones :PeticionesService) { }

  ngOnInit() {
  }

}
