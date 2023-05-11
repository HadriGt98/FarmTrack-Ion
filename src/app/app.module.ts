import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module'
import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './register/register.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { NewUsageComponent } from './new-usage/new-usage.component';
import { NewVehicleComponent } from './new-vehicle/new-vehicle.component';
import { EditVehicleComponent } from './edit-vehicle/edit-vehicle.component';
import { EditUsageComponent } from './edit-usage/edit-usage.component';
import { ShowVehicleComponent } from './show-vehicle/show-vehicle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HeaderComponent } from './header/header.component';
// import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent,
    HomeComponent,
    NewUsageComponent,
    VehicleListComponent,
    RegisterComponent,
    PagenotfoundComponent,
    ForbiddenComponent,
    HeaderComponent,
    NewVehicleComponent,
    ShowVehicleComponent,
    EditVehicleComponent,
    EditUsageComponent
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    BrowserAnimationsModule, 
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('token');
          },
        }
    }),
    ToastrModule.forRoot(),
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: JwtModule, useValue: JWT_OPTIONS}, JwtModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
