import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'seasons-list',
    template: `
        <h3>Seasons List</h3>
        <pre>{{seasons | json}}</pre>
    `
})
export class SeasonsListComponent implements OnInit {

    @Input('seasons') seasons;
    constructor() { }

    ngOnInit() { 
    }

}