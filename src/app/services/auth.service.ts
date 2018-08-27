import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PeticionesService} from './peticiones.service';

@Injectable()
export class AuthService {
	private _peticiones: PeticionesService;
  constructor(private injector: Injector) { }
   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this._peticiones = this.injector.get(PeticionesService);

    req = req.clone({
      setHeaders: {
        'Content-Type': 'application/json'
      }
    });

    return next.handle(req);
  }
}

