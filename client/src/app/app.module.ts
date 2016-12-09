import { HomePageComponent } from './Home/homePage.component';
import { LoginWebviewComponent } from './Login/loginWebview.component';
import { LoginPageComponent } from './Login/loginPage.component';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: '**', redirectTo: "/login" },
];




@NgModule({
  schemas: [NO_ERRORS_SCHEMA],
  declarations: [
    AppComponent,
    LoginPageComponent,
    LoginWebviewComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes,{ useHash: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

