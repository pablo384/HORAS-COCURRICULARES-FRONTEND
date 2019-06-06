import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FuncionesService } from '../../services/funciones.service';
import { PeticionesService } from '../../services/peticiones.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListCarrerasComponent } from '../list-carreras/list-carreras.component';
import { ListCargosComponent } from '../list-cargos/list-cargos.component';
import { ConfirmationService } from 'primeng/api';




@Component({
  selector: 'app-reg-cargo',
  templateUrl: './reg-cargo.component.html',
  styleUrls: ['./reg-cargo.component.css']
})
export class RegCargoComponent implements OnInit {
  formCarrera: FormGroup;
  id;
  Inpdisplay: boolean;
  // @Output() public Outdisplay = new EventEmitter<boolean>();
  constructor(
    private aroute: ActivatedRoute,
    private fb: FormBuilder,
    private _router: Router,
    private _funtions: FuncionesService,
    private confirmationService: ConfirmationService,
    private _peticiones: PeticionesService
  ) { }
  salir() {
    this.confirmationService.confirm({
      message: '¿Seguro que quieres salir?',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        // this.eliminarCargo(id);
        this.OnHIde();
      }
    });
  }
  ngOnInit() {
    this.Inpdisplay = true;
    this.aroute.params.subscribe(params => {
      console.log('params["conferencia"]', params);
      this.id = params['id'];
    }
    );
    this.createForm();
    if (this.id != undefined) {
      this.GetCarrera();
    }

  }

  createForm(n = '') {
    this.formCarrera = this.fb.group({
      nombre: n,
    });
    this._funtions.actionsOnRoute(this.formCarrera.controls);
  }

  OnHIde() {
    let uri = 'cargos';
    if (this.id != null) {
      uri = 'cargos';
    }
    this.formCarrera.reset();
    this.Inpdisplay = false;
    this._router.navigate([uri]);
    ListCargosComponent.returned.next(false);
  }


  GetCarrera() {
    this._funtions.blockUIO().start();
    this._peticiones.GetCargo(this.id).subscribe(
      response => {
        this._funtions.blockUIO().stop();
        console.log(response);
        if (response.info) {
          this.createForm(response.data.nombre);
        } else {
          this._funtions.Toast('error', 'error', this._funtions.sacarText(response.error));
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
    // console.log("sdfdf",this.formCarrera.value)
  }

  onSubmit() {
    let cNameAction = 'crearcargo';
    const value = JSON.parse(JSON.stringify(this.formCarrera.value));
    value.nombre = value.nombre.toUpperCase();
    if (this.id != null) {
      cNameAction = 'Actualizarcargo';
      value.id = this.id;
    }
    console.log('value', value, 'cNameAction', cNameAction);
    this._funtions.blockUIO().start();
    this._peticiones[cNameAction](value, this.id).subscribe(
      response => {
        this._funtions.blockUIO().stop();
        console.log(response);
        if (response.info) {
          this._funtions.Toast('success', 'success', response.message);
          this.OnHIde();
          // this.Outdisplay.emit(false);
          // this._router.navigate(['/home']);
        } else {
          this._funtions.Toast('error', 'error', this._funtions.sacarText(response.error));
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
    console.log('sdfdf', this.formCarrera.value);
  }
}
