import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FuncionesService } from '../../services/funciones.service';
import { PeticionesService } from '../../services/peticiones.service';
import { ListVerificadoresComponent } from '../list-verificadores/list-verificadores.component';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-reg-verificador',
  templateUrl: './reg-verificador.component.html',
  styleUrls: ['./reg-verificador.component.css']
})
export class RegVerificadorComponent implements OnInit {
  @Input() Inpdisplay: boolean;
  formPerson: FormGroup;
  id;
  datosCurrent;
  constructor(
    private aroute: ActivatedRoute,
    private fb: FormBuilder,
    private _router: Router,
    private _funtions: FuncionesService,
    private confirmationService: ConfirmationService,
    private _peticiones: PeticionesService
  ) {
    this.aroute.params.subscribe(params => {
      console.log('params["conferencia"]', params);
      this.id = params['id'];
    }
    );

  }

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
    this.Inpdisplay = true;
    this.createForm();
    if (this.id) {
      this.getVerifcador();
    }

  }

  OnHIde() {
    let uri = '/verificadores';
    if (this.id != null) {
      uri = 'verificadores';
    }
    this.formPerson.reset();
    this.Inpdisplay = false;
    this._router.navigate([uri]);
    ListVerificadoresComponent.returned.next(false);
    // this._funtions.backRoute()
  }

  getVerifcador() {
    this._funtions.blockUIO().start();
    this._peticiones.GetVerifidor(this.id).subscribe(
      response => {
        this._funtions.blockUIO().stop();
        console.log(response);
        if (response.info) {
          response.data.estado = response.data.estado == 'A';
          this.datosCurrent = response.data;
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

  createForm(a = { name: '',
  surname: '',
  address: '',
  cedula: '',
  email: '',
  phone: '',
  nick: '',
  password: '',
  estado: 'A',
  isAdmin: false }) {
    this.formPerson = this.fb.group({
      name: [a.name, Validators.required],
      surname: [a.surname, Validators.required],
      address: a.address,
      cedula: a.cedula,
      email: [a.email, Validators.compose([Validators.required, Validators.email])],
      phone: [a.phone, Validators.required],
      nick: [a.nick, Validators.required],
      tipo: 'V',
      isAdmin: a.isAdmin,
      estado: a.estado,
      password: [a.password, Validators.compose([Validators.required, Validators.minLength(4)])],
      passwordConfirm: [a.password, Validators.compose([Validators.required, Validators.minLength(4)])]
    });
    this._funtions.actionsOnRoute(this.formPerson.controls);
  }

  onSubmit() {
    const value = JSON.parse(JSON.stringify(this.formPerson.value));
    let cNameAction = 'RegistrarVerificador';
    if (this.id != null) {
      cNameAction = 'ActualizarVerificador';
      value.id = this.id;
      value.id_nick = this.datosCurrent.id;
    }
    console.log('value', value, 'cNameAction', cNameAction);
// tslint:disable-next-line: triple-equals
    if (value.password == value.passwordConfirm) {
      value.estado = value.estado ? 'A' : 'I';
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
    } else {
      this._funtions.Toast('error', 'error', 'Contraseñas no coinciden');
    }
  }

}
