import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class FuncionesService {

  constructor(private myRoute: Router) { }


  sendToken(token: string) {
    localStorage.setItem("LoggedInUser", token)
  }
  getToken() {
    return localStorage.getItem("LoggedInUser")
  }
  isLoggednIn() {
    // console.log("this.getToken()",this.getToken())
    return this.getToken() !== null;
  }
  logout() {
    localStorage.removeItem("LoggedInUser");
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
