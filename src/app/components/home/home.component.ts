import { Component, OnInit } from '@angular/core';
import {FuncionesService} from '../../services/funciones.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _funtions: FuncionesService,) { }

  ngOnInit() {
  }

}
