import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'item-list-page',
    styles: [
        '.container { display:inline-flex; }',
    ],
    template: `
        <div class="container">
            <list-sidebar></list-sidebar>
            <router-outlet></router-outlet>
        </div>

    `
})
export class ListPageComponent implements OnInit {


    constructor(private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        console.log('init', this.route)


    }

    

}