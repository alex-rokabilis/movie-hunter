import { APP_CONFIG, config  } from './app-config';
import { MovieModule } from './Movie/movie.module';
import { NavbarComponent } from './Navbar/navbar.component';
import { UserService } from './User/user.service';
import { HomePageComponent } from './Home/homePage.component';
import { LoginWebviewComponent } from './Login/loginWebview.component';
import { LoginPageComponent } from './Login/loginPage.component';
import { CanActivateLogin } from './Login/loginCanActivate.service';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'login', component: LoginPageComponent , canActivate: [CanActivateLogin] },
  { path: 'home', component: HomePageComponent },
  { path: '**', redirectTo: "/login" },
];




@NgModule({
  schemas: [NO_ERRORS_SCHEMA],
  declarations: [
    AppComponent,
    LoginPageComponent,
    LoginWebviewComponent,
    HomePageComponent,
    NavbarComponent,
    ...MovieModule.components
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes,{ useHash: true }),
    MovieModule.routing
    
  ],
  providers: [UserService,CanActivateLogin, { provide: APP_CONFIG, useValue: config }],
  bootstrap: [AppComponent]
})
export class AppModule { }

