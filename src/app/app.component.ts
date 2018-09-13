import { Component } from '@angular/core';
import {FuncionesService} from './services/funciones.service';
import {PeticionesService} from './services/peticiones.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app';
  TotalDeConferencias;
	constructor(private _funtions: FuncionesService,private _peticiones:PeticionesService) {
		this.actividadesDehoy();
	}
  permisosEstudiante =[{}]
  permisosVerificador =[{}]

  ListadoAccesos ={estudiante:this.permisosEstudiante,verificador:this.permisosVerificador}


  isAdmin(){
    return true;//this._funtions.getLoggedUser().tipo == 'A'
  }
  actividadesDehoy(){
  	this._funtions.blockUIO().start()
      this._peticiones.GetConferenciasDeHoy().subscribe(
        response => {
           this._funtions.blockUIO().stop()
          console.log('response',response);
          this.TotalDeConferencias = response.data.length;
        },
        error => {
          // let resultado;
          // if (error.error && error.status !== 0) {
          //   resultado = this._funtions.sacarText(error.error);
          // } else {
          //   resultado = error.error.message;
          // }
          // console.log(error.error.message)
          // this._funtions.Toast("error","Error",resultado);

          this._funtions.blockUIO().stop(); 
        }
      );
  }
}
