import { LoaderComponent } from './Loader/loader.component';
import { APP_CONFIG, config  } from './app-config';

import { LoginModule } from './Login/login.module';
import { MovieModule } from './Movie/movie.module';
import { NavbarComponent } from './Navbar/navbar.component';
import { HomePageComponent } from './Home/homePage.component';
import { AppComponent } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: '**', redirectTo: "/login" },
];




@NgModule({
  schemas: [NO_ERRORS_SCHEMA],
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    LoaderComponent,
    ...LoginModule.components,
    ...MovieModule.components
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes,{ useHash: true }),
    MovieModule.routing,
    LoginModule.routing
    
  ],
  providers: [{ provide: APP_CONFIG, useValue: config }],
  bootstrap: [AppComponent]
})
export class AppModule { }

