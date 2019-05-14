import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FuncionesService } from '../../services/funciones.service';
import { PeticionesService } from '../../services/peticiones.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  formPerfil: FormGroup;
  @ViewChild('inputLogo') inputLogo: ElementRef;
  Inpdisplay: boolean;
  // @Output() public Outdisplay = new EventEmitter<boolean>();
  constructor(private fb: FormBuilder,
    private _router: Router,
    private _funtions: FuncionesService,
    private _peticiones: PeticionesService) { }

  ngOnInit() {
    this.Inpdisplay = true;
    console.log('_funtions.getLoggedUser()',
      this._funtions.getLoggedUser());
    this.createForm();
  }

  createForm() {
    this.formPerfil = this.fb.group({
      claveActual: '',
      clave: '',
      claveConfirm: ''
    });
  }

  OnHIde() {
    this.formPerfil.reset();
    this.Inpdisplay = false;
    this._router.navigate(['/']);
    // this.Outdisplay.emit(false);
  }

  onFileChange(event) {
    const files = event.target.files;
    console.log(files);
    const reader = new FileReader();
    if (files && files.length > 0) {
      const file = files[0];
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const image = {
          name: file.name,
          type: file.type,
          data: reader.result.split(',')[1]
        };
        console.log('IMG::', image);
        const bas64 = 'data:' + file.type + ';base64,' + reader.result.split(',')[1];
        console.log('IMG:bas64:', bas64);
        // if(type== "footer"){
        //   this.imgF = bas64;
        // }else{
        //   this.imgBg = bas64;
        // }
        // console.log(this.formConfig.value);
      };
    }
  }

  openInput() {
    this.inputLogo.nativeElement.click();
  }

  onSubmit() {
    this._funtions.blockUIO().start();
    this._peticiones.crearCarrera(this.formPerfil.value).subscribe(
      response => {
        this._funtions.blockUIO().stop();
        console.log(response);
        if (response.info) {
          this._funtions.Toast('success', 'success', response.message);
          this.OnHIde();
          // this.Outdisplay.emit(false);
          // this._router.navigate(['/home']);
        } else {
          this._funtions.Toast("error", "error", this._funtions.sacarText(response.error));
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
    console.log('sdfdf', this.formPerfil.value);
  }
}
