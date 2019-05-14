import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FuncionesService } from '../../services/funciones.service';
import { PeticionesService } from '../../services/peticiones.service';

@Component({
  selector: 'app-list-asistencias',
  templateUrl: './list-asistencias.component.html',
  styleUrls: ['./list-asistencias.component.css']
})
export class ListAsistenciasComponent implements OnInit {
  listaEstudiantesPorActividad: any[];
  conferencia;
  displayPoncheo: boolean;
  searchText;
  datosPoncheo;
  constructor(
    private _router: Router,
    private aroute: ActivatedRoute,
    private _funtions: FuncionesService,
    private _peticiones: PeticionesService
  ) {
    this.displayPoncheo = false;
    this.aroute.queryParams.subscribe(params => {
      console.log('params["conferencia"]', params);
      this.conferencia = JSON.parse(params['conferencia']);
      this.conferencia.finalizada = this.conferencia.hora_fin != null && this.conferencia.hora_inicio != null;
    }
    );

    this.displayPoncheo = false;

  }

  changeDisplayPoncheo(event) {
    this.displayPoncheo = event;
    console.log('changeDisplayPoncheo event', event);
    this.ListadoEstudiantesPorConferencias();
  }
  private doThingFactory() {
    return (matricula) => this.verificarParticipacion(matricula);
  }

  verificarParticipacion(cDatos) {
    const value = { conferencia: this.conferencia.id };
    // if (!isNaN(parseInt(cDatos)) && parseInt(cDatos) > 0) {
    //   if (cDatos.length == 16) {
        // value['carnet'] = cDatos;
      // } else {
        value["matricula"] = cDatos;
      // }
    // } else {
    //   value['usuario'] = cDatos;
    // }
    console.log('value', JSON.stringify(value));
    this._funtions.blockUIO().start();
    this._peticiones.verificarParticipacion(value).subscribe(
      response => {
        this._funtions.blockUIO().stop();
        console.log('verificarParticipacion', response);
        if (response.info) {
          this.datosPoncheo = {...response.data, msg: response.message || ''};
          this.datosPoncheo.conferencia = this.conferencia;
          this.displayPoncheo = true;
          // this._router.navigate(["/ponchar_asistencia?datos="+JSON.stringify(response.data)])//, { queryParams: {datos:JSON.stringify(response.data) }, queryParamsHandling: 'preserve' });
          // this._router.navigate(["ponchar_asistencia",{datos:response.data}])//, { queryParams: {datos:JSON.stringify(response.data) }, queryParamsHandling: 'preserve' });
          //
        } else {
          this._funtions.Toast('error', 'Error', this._funtions.sacarText(response.error || response.message));
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


  ngOnInit() {
    this.ListadoEstudiantesPorConferencias();
  }

  ListadoEstudiantesPorConferencias() {
    this._funtions.blockUIO().start();
    this._peticiones.GetAsistenciaPorConferencias(this.conferencia.id).subscribe(
      response => {
        this._funtions.blockUIO().stop();
        console.log(response);
        this.listaEstudiantesPorActividad = response.data;

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
