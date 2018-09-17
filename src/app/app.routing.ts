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

import { DetalleConferenciaComponent } from './components/detalle-conferencia/detalle-conferencia.component';



import { AuthGuard } from './auth.guard';
 
const appRoutes: Routes = [
    // { path: '', component: HomeComponent, canActivate: [AuthGuard]},
    { path: '', component: HomeComponent, pathMatch: 'full' , canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent },
    { path: 'iniciar_actividad', component: IniciarActividadComponent },
    { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },

    { path: 'resgistrar_estudiante', component: RegEstudianteComponent, canActivate: [AuthGuard] },
    { path: 'resgistrar_conferencista', component: RegConferencistaComponent, canActivate: [AuthGuard] },
    { path: 'resgistrar_carrera', component: RegCarreraComponent, canActivate: [AuthGuard] },
    { path: 'carrera/editar/:id', component: RegCarreraComponent, canActivate: [AuthGuard] },
    { path: 'resgistrar_actividad', component: RegActividadComponent, canActivate: [AuthGuard] },
    { path: 'resgistrar_conferencia', component: RegConferenciaComponent, canActivate: [AuthGuard] },
    { path: 'resgistrar_verificador', component: RegVerificadorComponent, canActivate: [AuthGuard] },
    

    { path: 'report_asistencia_conferencia', component: ReportAsistenciaPorConferenciaComponent, canActivate: [AuthGuard] },
    

    { 
        path: 'lista_actividades',
        component: ListActividadesComponent, canActivate: [AuthGuard],
        children: [
          {path: 'reg', component: RegConferenciaComponent},
        ]
    },

    { path: 'conferencias', component: ListConferenciasComponent,canActivate: [AuthGuard] },
    { path: 'list_conferencistas', component: ListConferencistasComponent, canActivate: [AuthGuard],
        children: [
          {path: 'detalle_conferencia', component: DetalleConferenciaComponent},
        ]
    },
    { path: 'list_asistencias', component: ListAsistenciasComponent, canActivate: [AuthGuard] },
    { path: 'list_estudiantes', component: ListEstudiantesComponent,canActivate: [AuthGuard],
      // children: [
      //     {path: 'ponchar_asistencia', component: PoncharAsistenciaComponent},
      //   ]
    },
    { path: 'list_carreras', component: ListCarrerasComponent,canActivate: [AuthGuard] },
    { path: 'list_verificadores', component: ListVerificadoresComponent,canActivate: [AuthGuard] },
 
    // otherwise redirect to home
    { path: '**', redirectTo: '',canActivate: [AuthGuard] }
    // { path: '**', redirectTo: ''}
];
 
export const routing = RouterModule.forRoot(appRoutes);