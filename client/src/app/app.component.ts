import { Router,ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  styles : [
        'a.active {color:red}',
    ], 
  template: `
    <navbar></navbar>
    <a routerLinkActive="active" routerLink="/movie">Movies</a>
    <a routerLinkActive="active" routerLink="/login">Login</a>
    <a routerLinkActive="active" routerLink="/home">Home</a>
    <router-outlet></router-outlet>

  `
})
export class AppComponent implements OnInit {
  title = "...";

  constructor(router: Router, route: ActivatedRoute){}

  delay(milliseconds: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds)
    })
  }

  async ngOnInit() {
    await this.delay(2000);
    this.title = "Hello World";


  }

}
