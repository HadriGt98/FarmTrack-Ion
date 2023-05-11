import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NewUsageComponent } from './new-usage/new-usage.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { RegisterComponent } from './register/register.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { NewVehicleComponent } from './new-vehicle/new-vehicle.component';
import { ShowVehicleComponent } from './show-vehicle/show-vehicle.component';
import { EditVehicleComponent } from './edit-vehicle/edit-vehicle.component';
import { EditUsageComponent } from './edit-usage/edit-usage.component';
import { AuthGuardGuard as AuthGuard } from './guard/auth-guard.guard';
import { AdminGuardGuard as AdminGuard } from './guard/admin-guard.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'new-usage', component: NewUsageComponent, canActivate: [AuthGuard] },
  { path: 'vehicle-list', component: VehicleListComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'new-vehicle', component: NewVehicleComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'show-vehicle/:vehicle_id', component: ShowVehicleComponent, canActivate: [AuthGuard] },
  { path: 'edit-vehicle/:vehicle_id', component: EditVehicleComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'edit-usage/:usage_id', component: EditUsageComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path:'forbidden', component: ForbiddenComponent},
  { path: '**', component: PagenotfoundComponent}, // wildcard route
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
