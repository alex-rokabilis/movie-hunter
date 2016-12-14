import { Router,ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <navbar></navbar>
    <a [routerLink]="['movie/popular']">Popular Movies</a>
    <a [routerLink]="['movie/trending']">Trending Movies</a>
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
