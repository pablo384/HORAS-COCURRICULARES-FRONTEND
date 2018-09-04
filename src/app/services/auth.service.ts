import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PeticionesService} from './peticiones.service';
import {FuncionesService} from './funciones.service';

@Injectable()
export class AuthService {
	private _peticiones: PeticionesService;
  constructor(private injector: Injector,private _funtions: FuncionesService) { }
   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this._peticiones = this.injector.get(PeticionesService);
    let d={
      'Content-Type': 'application/json'

    }


    if (this._funtions.getToken() != null){
      d["authorization"] = this._funtions.getToken()
    } 
    req = req.clone({
      setHeaders:d 
    });

    return next.handle(req);
  }
}

