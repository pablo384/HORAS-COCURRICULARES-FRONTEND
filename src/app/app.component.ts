import { Component } from '@angular/core';
import {FuncionesService} from './services/funciones.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	constructor(private _funtions: FuncionesService) { }
  title = 'app';
}
