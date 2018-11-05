import { Component, OnInit } from '@angular/core';
import { Subject,Subscription } from 'rxjs';
import {PeticionesService} from '../../services/peticiones.service';
import {FuncionesService} from '../../services/funciones.service';
import * as moment from "moment"
@Component({
  selector: 'app-list-actividades',
  templateUrl: './list-actividades.component.html',
  styleUrls: ['./list-actividades.component.css']
})
export class ListActividadesComponent implements OnInit {
  ListadoDeActividades:any[];
  searchText;
  public static returned: Subject<any> = new Subject();
  subc:Subscription;
  constructor(private _funtions: FuncionesService, private _peticiones :PeticionesService) {
    this.searchText= '';
     this.subc = ListActividadesComponent.returned.subscribe(res => {
      this.buscarActividades(moment().format("YYYY-MM-DD"), moment().format("YYYY-MM-DD"))
    });
   }

  ngOnInit() {
    this.buscarActividades(moment().format("YYYY-MM-DD"), moment().format("YYYY-MM-DD"))
  }


  private doThingFactory() {
    return (fecha1,fecha2) => this.buscarActividades(fecha1,fecha2);
  }

  ngOnDestroy(): void {
    this.subc.unsubscribe();
  }
  buscarActividades(fecha1,fecha2){
    this._peticiones.GetActividades(fecha1,fecha2).subscribe(
      response => {
        this._funtions.blockUIO().stop()
        console.log("buscarActividades",response.data);
        if (response.info) {
          // console.log("SDFKJDSJFJDSFJDENTRO",response.data);
           this.ListadoDeActividades = response.data;
        }
        //   this._funtions.Toast("success", "success", response.message);
        //   this.OnHIde();
        //   // this._router.navigate(['/home']);
        // }else
        //   this._funtions.Toast("error", "error",this._funtions.sacarText(response.error || response.message));

      },
      error => {
        let resultado;
        if (error.error && error.status !== 0) {
          resultado = this._funtions.sacarText(error.error);
        } else {
          resultado = error.error.error;
        }
        console.log(error.error)
        this._funtions.Toast("error","Error",resultado);

        this._funtions.blockUIO().stop(); 
      }
    );


    return
  }
}
