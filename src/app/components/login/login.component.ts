import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {ToasterService} from 'angular5-toaster/dist';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {FuncionesService} from '../../services/funciones.service';
import {PeticionesService} from '../../services/peticiones.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
	loginForm: FormGroup;
	loading = false;
    submitted = false;
    returnUrl: string;
  constructor(private _funtions: FuncionesService, private formBuilder: FormBuilder,private _router: Router, private _peticiones :PeticionesService,private toasterService: ToasterService ) {
  	 
  }

  get f() { return this.loginForm.controls; }
  ngOnInit() {
  	this.loginForm = this.formBuilder.group({
            usuario: ['', Validators.required],
            password: ['', Validators.required]
        });

  }
  onSubmit() {
    this.submitted = true;
    // console.log(this.loginForm.value);
    this.blockUI.start()
    this._peticiones.login(this.loginForm.value).subscribe(
      response => {
         this.blockUI.stop()
        console.log(response);
        if (response && response["token"]) {
           this.toasterService.pop("success", "success", "Bienvenido!!");
          this._funtions.setCookieObject("LoggedInUser",response["user"])
          this._funtions.setCookieText("token",response["token"])
          this._router.navigate(['/home']);
        }

      },
      error => {
        let resultado;
        if (error.error && error.status !== 0) {
          resultado = this._funtions.sacarText(error.error);
        } else {
          resultado = error.error.message;
        }
        console.log(error.error.message)
        this.toasterService.pop("error","Error",resultado);

        this.blockUI.stop(); 
      }
    );

  }

}
