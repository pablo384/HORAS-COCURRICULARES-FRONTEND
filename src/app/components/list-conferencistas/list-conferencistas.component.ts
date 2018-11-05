import { Component, OnInit } from '@angular/core';
import { Subject,Subscription } from 'rxjs';
import {FuncionesService} from '../../services/funciones.service';
import {PeticionesService} from '../../services/peticiones.service';
@Component({
  selector: 'app-list-conferencistas',
  templateUrl: './list-conferencistas.component.html',
  styleUrls: ['./list-conferencistas.component.css']
})
export class ListConferencistasComponent implements OnInit {
	ListadoConferencistas;
  searchText;
  public static returned: Subject<any> = new Subject();
  subc:Subscription;
    constructor(private _funtions: FuncionesService, private _peticiones :PeticionesService ) {
      this.searchText='';
      this.subc = ListConferencistasComponent.returned.subscribe(res => {
        this.listadoDeConferencistas();
      });
    }

  ngOnInit() {
  	this.listadoDeConferencistas()
  }

  ngOnDestroy(): void {
    this.subc.unsubscribe();
  }

  listadoDeConferencistas() {
    
    // console.log(this.loginForm.value);
    this._funtions.blockUIO().start()
    this._peticiones.GetConferencistas().subscribe(
      response => {
         this._funtions.blockUIO().stop()
        console.log('response',response);
        this.ListadoConferencistas = response.data;

      },
      error => {
        let resultado;
        if (error.error && error.status !== 0) {
          resultado = this._funtions.sacarText(error.error);
        } else {
          resultado = error.error.message;
        }
        console.log(error.error.message)
        this._funtions.Toast("error","Error",resultado);

        this._funtions.blockUIO().stop(); 
      }
    );

  }

}
