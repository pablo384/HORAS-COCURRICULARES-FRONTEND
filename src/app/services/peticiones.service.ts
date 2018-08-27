
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {CONSTANTES} from './CONSTANTES.service';
@Injectable()
export class PeticionesService {
  public url: string;
  constructor(private  http: HttpClient) {
    this.url = "http://"+CONSTANTES.url;
  }

  getResultadosDeSorteos(cFecha:string,token:string) {
    
      return this.http.get(this.url +'')
  } 

  realizarContingencia(data: string) {
    return this.http.post(this.url + '/realizar_contingencia',data)
  }
}
