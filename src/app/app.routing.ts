import { Routes, RouterModule } from '@angular/router';
 
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

// import { AuthGuardService } from './services/auth-guard.service';
 
const appRoutes: Routes = [
    // { path: '', component: HomeComponent, canActivate: [AuthGuardService]},
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent },
 
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
 
export const routing = RouterModule.forRoot(appRoutes);