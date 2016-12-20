import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'seasons-list',
    template: `
        <h3>Seasons List</h3>

        <ul>
            <li *ngFor="let season of seasons">
                <p>Season -- {{season.number}}</p>
            </li>
        </ul>
        <!-- <pre>{{seasons | json}}</pre>-->
    `
})
export class SeasonsListComponent implements OnInit {

    @Input('seasons') seasons;
    constructor() { }

    ngOnInit() {
        this.seasons.sort( (a,b) => b.number - a.number )
    }

}