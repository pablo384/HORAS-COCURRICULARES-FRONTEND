import { Routes, RouterModule } from '@angular/router';
 
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegEstudianteComponent } from './components/reg-estudiante/reg-estudiante.component';
import { RegConferencistaComponent } from './components/reg-conferencista/reg-conferencista.component';
import { RegCarreraComponent } from './components/reg-carrera/reg-carrera.component';
import { RegConferenciaComponent } from './components/reg-conferencia/reg-conferencia.component';
import { RegActividadComponent } from './components/reg-actividad/reg-actividad.component';
import { RegVerificadorComponent } from './components/reg-verificador/reg-verificador.component';

import { ListActividadesComponent } from './components/list-actividades/list-actividades.component';
import { ListConferenciasComponent } from './components/list-conferencias/list-conferencias.component';
import { ListAsistenciasComponent } from './components/list-asistencias/list-asistencias.component';


import { AuthGuard } from './auth.guard';
 
const appRoutes: Routes = [
    // { path: '', component: HomeComponent, canActivate: [AuthGuard]},
    { path: '', component: HomeComponent, pathMatch: 'full' , canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent },
    { path: 'resgistrar_estudiante', component: RegEstudianteComponent, canActivate: [AuthGuard] },
    { path: 'resgistrar_conferencista', component: RegConferencistaComponent, canActivate: [AuthGuard] },
    { path: 'resgistrar_carrera', component: RegCarreraComponent, canActivate: [AuthGuard] },
    { path: 'resgistrar_actividad', component: RegActividadComponent, canActivate: [AuthGuard] },
    { path: 'resgistrar_conferencia', component: RegConferenciaComponent, canActivate: [AuthGuard] },
    { path: 'resgistrar_verificador', component: RegVerificadorComponent, canActivate: [AuthGuard] },
    

    { 
        path: 'lista_actividades',
        component: ListActividadesComponent, canActivate: [AuthGuard],
        children: [
          {path: 'reg/:actividad', component: RegConferenciaComponent},
        ]
    },

    { path: 'conferencias', component: ListConferenciasComponent,canActivate: [AuthGuard] },
    { path: 'list_estudiantes', component: ListAsistenciasComponent,canActivate: [AuthGuard] },
 
    // otherwise redirect to home
    { path: '**', redirectTo: '',canActivate: [AuthGuard] }
    // { path: '**', redirectTo: ''}
];
 
export const routing = RouterModule.forRoot(appRoutes);