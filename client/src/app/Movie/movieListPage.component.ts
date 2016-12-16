import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'movie-list-page',
    styles: [
        '.container { display:inline-flex; }',
    ],
    template: `
        <div class="container">
            <sidebar></sidebar>
            <router-outlet></router-outlet>
        </div>

    `
})
export class MovieListPageComponent implements OnInit {


    constructor(private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        console.log('init', this.route)


    }

    

}