import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbDropdownModule, NgbModule, NgbDropdown} from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS, HttpClientModule}            from '@angular/common/http';
import { FormBuilder, FormsModule,ReactiveFormsModule} from '@angular/forms';
import {InputSwitchModule , CalendarModule , InputTextModule,ConfirmDialogModule ,PasswordModule, InputMaskModule ,ChartModule , MultiSelectModule , ListboxModule ,SplitButtonModule,DialogModule,AutoCompleteModule,DropdownModule,FileUploadModule} from 'primeng/primeng';
import { MomentModule } from 'angular2-moment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToasterModule, ToasterService}  from 'angular5-toaster/dist';
import {ConfirmationService } from 'primeng/api';
import {BlockUIModule} from 'ng-block-ui';
import {CookieModule, CookieService} from 'ngx-cookie';

import { AppComponent } from './app.component';

import { PeticionesService } from './services/peticiones.service'
import { FuncionesService } from './services/funciones.service'
import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/login/login.component'
import { routing }        from './app.routing';
import { HomeComponent } from './components/home/home.component';
import { BoxBodyComponent } from './components/box-body/box-body.component';
import { RegEstudianteComponent } from './components/reg-estudiante/reg-estudiante.component';
import { RegActividadComponent } from './components/reg-actividad/reg-actividad.component';
import { RegCarreraComponent } from './components/reg-carrera/reg-carrera.component';
import { ListActividadesComponent } from './components/list-actividades/list-actividades.component';
import { RegConferenciaComponent } from './components/reg-conferencia/reg-conferencia.component';
import { ListEstudiantesComponent } from './components/list-estudiantes/list-estudiantes.component';
import { RegConferencistaComponent } from './components/reg-conferencista/reg-conferencista.component';
import { ListConferenciasComponent } from './components/list-conferencias/list-conferencias.component';
import { RegVerificadorComponent } from './components/reg-verificador/reg-verificador.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { ListAsistenciasComponent } from './components/list-asistencias/list-asistencias.component';
import { IniciarActividadComponent } from './components/iniciar-actividad/iniciar-actividad.component';
import { BuscarPorFechaComponent } from './components/buscar-por-fecha/buscar-por-fecha.component';
import { PoncharAsistenciaComponent } from './components/ponchar-asistencia/ponchar-asistencia.component';
import { ListEntradaSalidaComponent } from './components/list-entrada-salida/list-entrada-salida.component';
import { ListConferencistasComponent } from './components/list-conferencistas/list-conferencistas.component';
import { ListCarrerasComponent } from './components/list-carreras/list-carreras.component';
import { ListVerificadoresComponent } from './components/list-verificadores/list-verificadores.component';
import { SearchPipe } from './search.pipe';
import { PerfilComponent } from './components/perfil/perfil.component';
import { DetalleConferenciaComponent } from './components/detalle-conferencia/detalle-conferencia.component';
import { ReportAsistenciaPorConferenciaComponent } from './components/report-asistencia-por-conferencia/report-asistencia-por-conferencia.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BoxBodyComponent,
    RegEstudianteComponent,
    RegActividadComponent,
    RegCarreraComponent,
    ListActividadesComponent,
    RegConferenciaComponent,
    ListEstudiantesComponent,
    RegConferencistaComponent,
    ListConferenciasComponent,
    RegVerificadorComponent,
    ListAsistenciasComponent,
    IniciarActividadComponent,
    BuscarPorFechaComponent,
    PoncharAsistenciaComponent,
    ListEntradaSalidaComponent,
    ListConferencistasComponent,
    ListCarrerasComponent,
    ListVerificadoresComponent,
    SearchPipe,
    PerfilComponent,
    DetalleConferenciaComponent,
    ReportAsistenciaPorConferenciaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ConfirmDialogModule,
    BlockUIModule.forRoot(),
    ToasterModule,
    CookieModule.forRoot(),
    MomentModule,
    InputSwitchModule,
    CalendarModule,
    InputTextModule,
    PasswordModule,
    InputMaskModule,
    ChartModule,
    MultiSelectModule,
    ListboxModule,
    SplitButtonModule,
    DialogModule,
    AutoCompleteModule,
    DropdownModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    NgbDropdownModule.forRoot(),
    routing,
    HttpClientModule
  ],
  providers: [
  	PeticionesService,
  	CookieService,
  	AuthGuard,
  	FuncionesService,
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
