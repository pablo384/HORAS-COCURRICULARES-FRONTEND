import { Component,OnDestroy } from '@angular/core';
import {Observable,Subject} from "rxjs";
import {FuncionesService} from './services/funciones.service';
import {PeticionesService} from './services/peticiones.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  title = 'app';
  private onDestroy$ = new Subject<void>();
  TotalDeConferencias;
	constructor(private _funtions: FuncionesService,private _peticiones:PeticionesService) {
		this.actividadesDehoy();
    // let t= Observable.interval(1000*60).takeUntil(this.onDestroy$);
    // t.subscribe(i => this.actividadesDehoy(false));
	}

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  isAdmin(){
    return this._funtions.getLoggedUser().isAdmin;
  }

  actividadesDehoy(lMos=true){
    if (lMos)
  	  this._funtions.blockUIO().start()
      this._peticiones.GetUltimoCuatrimestre().subscribe(
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
