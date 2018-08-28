import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbDropdownModule, NgbModule, NgbDropdown} from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS, HttpClientModule}            from '@angular/common/http';
import { FormBuilder, FormsModule,ReactiveFormsModule} from '@angular/forms';
import {InputSwitchModule} from 'primeng/primeng';
import { MomentModule } from 'angular2-moment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToasterModule, ToasterService}  from 'angular5-toaster/dist';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {BlockUIModule} from 'ng-block-ui';


import { AppComponent } from './app.component';

import { PeticionesService } from './services/peticiones.service'
import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/login/login.component'
import { routing }        from './app.routing';
import { HomeComponent } from './components/home/home.component';
import { BoxBodyComponent } from './components/box-body/box-body.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BoxBodyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ConfirmDialogModule,
    BlockUIModule.forRoot(),
    ToasterModule,
    MomentModule,
    InputSwitchModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    NgbDropdownModule.forRoot(),
    routing,
    HttpClientModule
  ],
  providers: [
  	PeticionesService,
  // WebsocketService,
  ConfirmationService,
  ToasterService,
  FormBuilder,
   {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
