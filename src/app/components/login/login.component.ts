import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {FuncionesService} from '../../services/funciones.service'
import {PeticionesService} from '../../services/peticiones.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	loading = false;
    submitted = false;
    returnUrl: string;
  constructor(private _funtions: FuncionesService, private formBuilder: FormBuilder,private router: Router, private _peticiones :PeticionesService ) {
  	 
  }

  get f() { return this.loginForm.controls; }
  ngOnInit() {
  	this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

  }
	onSubmit() {
    this._peticiones.login("").subscribe(
      response => {
        console.log(response);
        if (response["data"] && response["data"].authentication_token) {
          this._funtions.sendToken(response["data"].authentication_token);
          // // console.log(response.auth_token);
          // this.token = response.data.authentication_token;
          // if (this.token.length <= 0) {
          //   alert('El token no se ha generado');
          // } else {
          //   if (response.medic != null) {
          //     this.user = response.data;
          //     this._userService.setCookieObject('medic', response.medic);
          //   }
          //   if (response.patient) {
          //     this.user = response.data;
          //     this._userService.setCookieObject('patient', response.patient);
          //   } else {
          //     this.user = new User();
          //     this.user = response.data;
          //   }
          //   if (response.roles) {
          //     this.user.role = response.roles[0];
          //   }
          //   this._userService.setCookieText('token', this.token);
          //   this._userService.setCookieObject('loggedUser', this.user);
          //   this.status = 'success';
          //   this._userService.blockUI.stop(); // Stop blocking
          //   this._userService.popToast(this.status, 'Identificado correctamente');
          //   // (this.user.city == null || this.user.zipcode == null) &&
          //   if (this.user.role === 'MEDICO') {
          //     this._router.navigate(['/register-medic']);
          //     this._userService.popToast(this.status, 'Favor complete los datos requeridos');
          //   } else if ((this.user.city == null || this.user.zipcode == null) && this.user.role === 'PACIENTE') {
          //     this._router.navigate(['/register-patient']);
          //     this._userService.popToast(this.status, 'Favor complete los datos requeridos');
          //   } else {
          //     this._router.navigate(['/']);
          //   }
          // }
        }

      },
      error => {
        // // if (error.status === 409) {
        // //
        // // }

        // if (error.error && error.status !== 0) {
        //   this.resultado = this._userService.sacarText(error.error);
        // } else {
        //   this.resultado = error.message;
        // }
        // // if (error.error.error.email[0]) {
        // //   console.log(error.error.error.email[0]);
        // //   this.msg = error.error.error.email[0];
        // //   this._userService.popToast(this.status, this.msg);
        // // } else if (error.error) {
        // //   this.msg = error.error;
        // //   this._userService.popToast(this.status, this.msg);
        // // }
        // this.status = 'error';
        // this._userService.blockUI.stop(); // Stop blocking
        // this._userService.popToast(this.status, this.resultado);
      }
    );
		this.router.navigate(["/"])
  }

}
