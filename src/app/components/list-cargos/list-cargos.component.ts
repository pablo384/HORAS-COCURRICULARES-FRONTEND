import { Component, OnInit } from '@angular/core';
import { SelectItem, ConfirmationService } from 'primeng/primeng';
import { Subject, Subscription } from 'rxjs';
import { FuncionesService } from '../../services/funciones.service';
import { PeticionesService } from '../../services/peticiones.service';
import * as moment from 'moment';
@Component({
  selector: 'app-list-cargos',
  templateUrl: './list-cargos.component.html',
  styleUrls: ['./list-cargos.component.css']
})
export class ListCargosComponent implements OnInit {
  cargos: any[];
  searchText;
  public static returned: Subject<any> = new Subject();
  subc: Subscription;
  constructor(private _funtions: FuncionesService,
    private _peticiones: PeticionesService,
    private confirmationService: ConfirmationService) {
    this.searchText = '';
    this.subc = ListCargosComponent.returned.subscribe(res => {
      this.allCarreras();
    });
  }

  ngOnInit() {
    this.allCarreras();
  }

  ngOnDestroy(): void {
    this.subc.unsubscribe();
  }
  confrimacion(id) {
    this.confirmationService.confirm({
      message: '¿Seguro que quieres desactivar este cargo?',
      accept: () => {
        this.eliminarCargo(id);
      }
    });
  }
  eliminarCargo(id) {
    this._peticiones.eliminarcargo(id).subscribe(
      response => {
        this._funtions.blockUIO().stop();
        if (response.info) {
          this._funtions.Toast('success', 'Success', response.message);
          this.allCarreras();

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
  allCarreras() {
    this.cargos = [];
    this._funtions.blockUIO().start();
    this._peticiones.GetAllcargo().subscribe(
      response => {
        this._funtions.blockUIO().stop();
        console.log(response);
        // this.cargos = response.data;
        for (let i = 0; i < response.data.length; ++i) {
          const cargos = response.data[i];
          this.cargos.push({
            label: cargos.nombre,
            value: cargos.id,
            creado: cargos.createdAt
            // creado:moment(carrera.createat).format("DD/MM/YYYY hh:mm:ss")
            // modificado:moment(carrera.updateat).format("DD/MM/YYYY hh:mm:ss")
          });
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

}
