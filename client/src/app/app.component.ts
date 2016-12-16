
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  styles: [
    'a.active {color:red}',
  ],
  template: `
    <loader></loader>
    <navbar></navbar>
    <a routerLinkActive="active" routerLink="/movie">Movies</a>
    <a routerLinkActive="active" routerLink="/tv">TV</a>
    <a routerLinkActive="active" routerLink="/login">Login</a>
    <a routerLinkActive="active" routerLink="/home">Home</a>
    <router-outlet></router-outlet>

  `
})
export class AppComponent{

  constructor(){}
 

}
