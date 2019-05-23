import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { PeticionesService } from '../../services/peticiones.service';
import { FuncionesService } from '../../services/funciones.service';
import * as moment from 'moment'
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-list-actividades',
  templateUrl: './list-actividades.component.html',
  styleUrls: ['./list-actividades.component.css']
})
export class ListActividadesComponent implements OnInit {
  ListadoDeActividades: any[];
  searchText;
  public static returned: Subject<any> = new Subject();
  subc: Subscription;
  constructor(private _funtions: FuncionesService,
    private _peticiones: PeticionesService,
    private confirmationService: ConfirmationService) {
    this.searchText = '';
    this.subc = ListActividadesComponent.returned.subscribe(res => {
      this.buscarActividades(moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'));
    });
  }

  ngOnInit() {
    this.buscarActividades(moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'));
  }


  private doThingFactory() {
    return (fecha1, fecha2) => this.buscarActividades(fecha1, fecha2);
  }

  ngOnDestroy(): void {
    this.subc.unsubscribe();
  }
  isAdmin() {
    return this._funtions.getLoggedUser().isAdmin;
  }
  eliminarCuatrimestre(item, index) {
    console.log('idx', index,
    'eliminar cuatrimestre::', item, item.total_conferencias, item.total_conferencias === '0', item.total_conferencias == '0');
    if (item.conferencias > 0) {
      this._funtions.Toast('warning', 'warning', 'Para eliminar un cuatrimestre debes eliminar todas sus actividades primero');
      // return;
    } else {
      console.log('ELSE ELIMINAR CUATRIMESTRE');
      this.confirmationService.confirm({
        message: '¿Seguro que quieres eliminar este cuatrimestre?',
        accept: () => {
          // Actual logic to perform a confirmation
          this.eliminarCuatrimestrePeticion(item.id);
        }
      });
    }

  }
  eliminarCuatrimestrePeticion(id) {
    // this._peticiones.
    this._peticiones.EliminarActividadCuatrimestre(id).subscribe(
      response => {
        this._funtions.blockUIO().stop();
        console.log('RESPONSE EliminarActividadCuatrimestre', response);
        if (response.info) {
          // this.ListadoDeActividades.
          // this.ListadoDeActividades.splice(index, 1);
          this.buscarActividades(moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'));
          this._funtions.Toast('success', 'Eliminada', response.message);
        }
      },
      error => {
        let resultado;
        if (error.error && error.status !== 0) {
          resultado = this._funtions.sacarText(error.error);
        } else {
          resultado = error.error.error;
        }
        console.log(error.error);
        this._funtions.Toast('error', 'Error', resultado);
        this._funtions.blockUIO().stop();
      }
    );
  }
  buscarActividades(fecha1, fecha2) {
    this._peticiones.GetCuatrimestres(fecha1, fecha2).subscribe(
      response => {
        this._funtions.blockUIO().stop();
        console.log('buscarActividades', response.data);
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
        console.log(error.error);
        this._funtions.Toast('error', 'Error', resultado);

        this._funtions.blockUIO().stop();
      }
    );


    return;
  }
}
