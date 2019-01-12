import { Routes, RouterModule } from '@angular/router';
 
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { IniciarActividadComponent } from './components/iniciar-actividad/iniciar-actividad.component';
import { PoncharAsistenciaComponent } from './components/ponchar-asistencia/ponchar-asistencia.component';
import { PerfilComponent } from './components/perfil/perfil.component';

import { RegEstudianteComponent } from './components/reg-estudiante/reg-estudiante.component';
import { RegConferencistaComponent } from './components/reg-conferencista/reg-conferencista.component';
import { RegCarreraComponent } from './components/reg-carrera/reg-carrera.component';
import { RegConferenciaComponent } from './components/reg-conferencia/reg-conferencia.component';
import { RegActividadComponent } from './components/reg-actividad/reg-actividad.component';
import { RegVerificadorComponent } from './components/reg-verificador/reg-verificador.component';

import { ListActividadesComponent } from './components/list-actividades/list-actividades.component';
import { ListConferenciasComponent } from './components/list-conferencias/list-conferencias.component';
import { ListConferencistasComponent } from './components/list-conferencistas/list-conferencistas.component';
import { ListAsistenciasComponent } from './components/list-asistencias/list-asistencias.component';
import { ListCarrerasComponent } from './components/list-carreras/list-carreras.component';
import { ListVerificadoresComponent } from './components/list-verificadores/list-verificadores.component';
import { ListEstudiantesComponent } from './components/list-estudiantes/list-estudiantes.component';



import { ReportAsistenciaPorConferenciaComponent } from './components/report-asistencia-por-conferencia/report-asistencia-por-conferencia.component';
import { ReportActividadesPorCuatrimestreComponent } from './components/report-actividades-por-cuatrimestre/report-actividades-por-cuatrimestre.component';
import { ReportCuatrimestresComponent } from './components/report-cuatrimestres/report-cuatrimestres.component';
import { ReportEstudiantesComponent } from './components/report-estudiantes/report-estudiantes.component';

import { DetalleConferenciaComponent } from './components/detalle-conferencia/detalle-conferencia.component';



import { AuthGuard } from './auth.guard';
 
const appRoutes: Routes = [
    // { path: '', component: HomeComponent, canActivate: [AuthGuard]},
    { path: '', component: HomeComponent, pathMatch: 'full' , canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent },
    { path: 'iniciar_actividad', component: IniciarActividadComponent },
    { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
    { 
        path: 'cuatrimestres',
        component: ListActividadesComponent, canActivate: [AuthGuard],
        children: [
          // { path: 'reg', component: RegConferenciaComponent},
          { path: 'registrar',     component: RegActividadComponent,     canActivate: [AuthGuard] },
          { path: ':id/editar',     component: RegActividadComponent,     canActivate: [AuthGuard] },
          { path: ':id/mostrar',     component: RegActividadComponent,     canActivate: [AuthGuard] },
        ]
    },

    { path: ':id_actividad/conferencias', component: ListConferenciasComponent,canActivate: [AuthGuard] ,
      children:[
        { path: 'registrar',   component: RegConferenciaComponent,   canActivate: [AuthGuard] },
        { path: ':id/editar',   component: RegConferenciaComponent,   canActivate: [AuthGuard] },
        { path: ':id/mostrar',   component: RegConferenciaComponent,   canActivate: [AuthGuard] },
      ]
    },
    {path: 'detalle_conferencia', component: DetalleConferenciaComponent},
    { path: 'conferencistas', component: ListConferencistasComponent, canActivate: [AuthGuard],
        children:[
            { path: 'registrar', component: RegConferencistaComponent, canActivate: [AuthGuard] },
            { path: ':id/editar', component: RegConferencistaComponent, canActivate: [AuthGuard] },
            { path: ':id/mostrar', component: RegConferencistaComponent, canActivate: [AuthGuard] },
        ]
    },
    { path: 'list_asistencias', component: ListAsistenciasComponent, canActivate: [AuthGuard] },
    { path: 'estudiantes', component: ListEstudiantesComponent,canActivate: [AuthGuard],
      children: [
        { path: 'registrar',    component: RegEstudianteComponent,    canActivate: [AuthGuard] },
        { path: ':id/editar',    component: RegEstudianteComponent,    canActivate: [AuthGuard] },
        { path: ':id/mostrar',    component: RegEstudianteComponent,    canActivate: [AuthGuard] },
      ]
    },
    { path: 'carreras', component: ListCarrerasComponent,canActivate: [AuthGuard],
      children:[
        { path: 'registrar',   component: RegCarreraComponent,       canActivate: [AuthGuard] },
        { path: ':id/editar',  component: RegCarreraComponent,       canActivate: [AuthGuard] },
        { path: ':id/mostrar', component: RegCarreraComponent,       canActivate: [AuthGuard] },
      ]
    },
    
    { path: 'verificadores', component: ListVerificadoresComponent,canActivate: [AuthGuard],
      children:[
        { path: 'registrar',   component: RegVerificadorComponent,   canActivate: [AuthGuard] },
        { path: ':id/editar',   component: RegVerificadorComponent,   canActivate: [AuthGuard] },
        { path: ':id/mostrar',   component: RegVerificadorComponent,   canActivate: [AuthGuard] },
      ]
    },
 
    {path:':id_actividad/report_actividades_por_cuatrimestre', component: ReportActividadesPorCuatrimestreComponent, canActivate: [AuthGuard] },
    {path:'report_asistencia_conferencia', component: ReportAsistenciaPorConferenciaComponent, canActivate: [AuthGuard] },
    {path:'report_de_cuatrimestres', component: ReportCuatrimestresComponent, canActivate: [AuthGuard] },
    {path:'report_de_estudiantes', component: ReportEstudiantesComponent, canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '',canActivate: [AuthGuard] }
    // { path: '**', redirectTo: ''}
];
 
export const routing = RouterModule.forRoot(appRoutes);