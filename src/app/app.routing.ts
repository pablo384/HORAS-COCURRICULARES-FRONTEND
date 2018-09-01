import { Routes, RouterModule } from '@angular/router';
 
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

import { AuthGuard } from './auth.guard';
 
const appRoutes: Routes = [
    // { path: '', component: HomeComponent, canActivate: [AuthGuard]},
     { path: '', component: HomeComponent, pathMatch: 'full' /*, canActivate: [AuthGuard]*/},
     // { path: '', component: HomeComponent, pathMatch: 'full' },
    // { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent },
 
    // otherwise redirect to home
    { path: '**', redirectTo: '',canActivate: [AuthGuard] }
    // { path: '**', redirectTo: ''}
];
 
export const routing = RouterModule.forRoot(appRoutes);