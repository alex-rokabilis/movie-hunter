import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'item-list-page',
    styles: [
        '.container { display:inline-flex; }',
    ],
    template: `
        <div class="container">
            <list-sidebar [title]="title"></list-sidebar>
            <router-outlet></router-outlet>
        </div>

    `
})
export class ListPageComponent implements OnInit {

    title:string;
    constructor(private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        console.log('init', this.route)

        this.title = this.route.snapshot.data['title'];

    }

    

}