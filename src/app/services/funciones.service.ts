import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie';
import {ToasterService} from 'angular5-toaster/dist';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {PeticionesService} from './peticiones.service';
@Injectable()
export class FuncionesService {
  @BlockUI() blockUI: NgBlockUI;
  public token: string;
  public loggedUser;
  constructor(private myRoute: Router,private cookieService: CookieService,private toasterService: ToasterService,private _peticiones:PeticionesService) { }

  setCookieObject(name: string, object: Object) {
    this.cookieService.putObject(name, object);
  }

  setCookieText(name: string, text: string) {
    this.cookieService.put(name, text);
  }
  // sendToken(token: string) {
  //   cookieService.setItem("LoggedInUser", token)
  // }
  Toast(cType="success",cTitle="success",cMsg){
    this.toasterService.pop(cType,cTitle,cMsg);
    // this.toasterService.pop("success", "success", "Bienvenido!!");
  }

  allCarreras(callBack){
    this.blockUIO().start()
    this._peticiones.GetAllCarrera().subscribe(
      response => {
        this.blockUIO().stop()
        callBack(response);
      },
      error => {
        let resultado;
        if (error.error && error.status !== 0) {
          resultado = this.sacarText(error.error);
        } else {
          resultado = error.error.error;
        }
        console.log(error.error)
        this.Toast("error","Error",resultado);

        this.blockUIO().stop(); 
      }
    );
   }


  blockUIO(){
    return this.blockUI;
  }

  getToken(): string {
    const token = this.cookieService.get('token');
    if (token !== 'undefined') {
      if (token !== '') {
        this.token = token;
      } else {
        this.token = null;
      }
    } else {
      this.token = null;
    }
    // console.log("getToken ",this.token)
    return this.token;
  }


  getLoggedUser() {
    const userExtracted = this.cookieService.getObject('LoggedInUser');
    if (userExtracted !== undefined) {
      if (userExtracted !== '') {
        this.loggedUser = userExtracted;
      } else {
        this.loggedUser = null;
      }
    } else {
      this.loggedUser = null;
    }
    return this.loggedUser;
  }



  isLoggednIn() {
    // console.log("this.getToken()",this.getToken(),this.getToken() != null)
    return this.getToken() != null;
  }

  logout() {
    this.cookieService.removeAll();
    this.myRoute.navigate(["login"]);
  }
  
  sacarText(xValue): string {
    let text = '';
    // console.log("dentro sacarText..",xValue)
    if (Object.prototype.toString.call(xValue) === '[object String]') {
      text += xValue + ' ';
    } else if (Object.prototype.toString.call(xValue) === '[object Object]') {
      const aKeys = Object.keys(xValue);
      for (let i = 0; i < aKeys.length; i++) {
        const cKey = aKeys[i];
        text += this.sacarText(xValue[cKey]);
      }
    } else if (Object.prototype.toString.call(xValue) === '[object Array]') {
      for (let i = 0; i < xValue.length; i++) {
        text += this.sacarText(xValue[i]);
      }
    }
    return text;
  }

}
