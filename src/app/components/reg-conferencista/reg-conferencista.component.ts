import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeticionesService } from '../../services/peticiones.service';
import { FuncionesService } from '../../services/funciones.service';
import { ListConferencistasComponent } from '../../components/list-conferencistas/list-conferencistas.component';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-reg-conferencista',
  templateUrl: './reg-conferencista.component.html',
  styleUrls: ['./reg-conferencista.component.css']
})
export class RegConferencistaComponent implements OnInit {
  id;
  Inpdisplay: boolean;
  formPerson: FormGroup;
  cargos = [];
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
      acceptLabel: 'Si',
      rejectLabel: 'No',
      message: '¿Seguro que quieres salir?',
      accept: () => {
        // this.eliminarCargo(id);
        this.OnHIde();
      }
    });
  }
  ngOnInit() {
    this.getCargos();

    this.aroute.params.subscribe(params => {
      console.log('params["conferencia"]', params);
      this.id = params['id'];
    }
    );
    this.Inpdisplay = true;
    if (this.id != undefined) {
      this.GetConferencista();
    }
    this.createForm();
  }
  getCargos() {
    this._peticiones.GetAllcargo().subscribe(
      (res: any) => {
        this.cargos = res.data;
      }
    );
  }
  GetConferencista() {
    this._funtions.blockUIO().start();
    this._peticiones.GetConferencista(this.id).subscribe(
      response => {
        this._funtions.blockUIO().stop();
        console.log(response);
        if (response.info) {
          response.data.estado = response.data.estado == 'A';
          this.id = response.data.id;
          this.createForm(response.data);
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
  }
  createForm(a = { nombres: '', apellidos: '', direccion: '', telefono: '', cedula: '', email: '', cargo: '', trabajo: '', estado: 'A' }) {
    this.formPerson = this.fb.group({
      nombres: [a.nombres, Validators.required],
      apellidos: [a.apellidos, Validators.required],
      direccion: a.direccion,
      cedula: a.cedula,
      email: [a.email, Validators.compose([Validators.required, Validators.email])],
      telefono: [a.telefono, Validators.required],
      esEstudiante: false,
      estado: a.estado,
      cargo: a.cargo,
      trabajo: a.trabajo
    });
    this._funtions.actionsOnRoute(this.formPerson.controls);
  }

  OnHIde() {
    let uri = '/conferencistas';
    if (this.id != null) {
      uri = 'conferencistas';
    }
    this.formPerson.reset();
    this.Inpdisplay = false;
    this._router.navigate([uri]);
    ListConferencistasComponent.returned.next(false);
  }
  onSubmit() {
    let cNameAction = 'crearEstudiante';
    const value = JSON.parse(JSON.stringify(this.formPerson.value));
    if (this.id != null) {
      cNameAction = 'ActualizarConferencista';
      value.id = this.id;
    }
    value.estado = value.estado ? 'A' : 'I';
    console.log('value', value, 'cNameAction', cNameAction);
    this._funtions.blockUIO().start();
    this._peticiones[cNameAction](value, this.id).subscribe(
      response => {
        this._funtions.blockUIO().stop();
        console.log(response);
        if (response.info) {
          this._funtions.Toast('success', 'success', response.message);
          this.OnHIde();
          // this._router.navigate(['/home']);
        } else {
          this._funtions.Toast('error', 'error', this._funtions.sacarText(response.error || response.message));
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

    console.log('onSubmit ', JSON.stringify(value));
  }
}
