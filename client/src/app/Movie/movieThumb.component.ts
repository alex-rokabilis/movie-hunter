import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'movie-thumb',
    styles: [
        ':host { display: inline-table; text-align: center;    }',
        '.img-container {background-color: #1d1d1d;position: relative;overflow: hidden;}',
        '.img-container img {min-height: 100%;position: relative; top: 0; left: 0;display: block;    width: 100%;vertical-align: middle;}'
    ],
    template: `
            <a [routerLink]='["../", movie.ids.slug]'>
                
                <div class="img-container">
                    <img src={{movie.backdrop_path}}>
                </div>
                <p>{{movie.title}}</p>
            </a>

    `
})
export class MovieThumbComponent implements OnInit {

    @Input() movie;
    constructor() { }

    ngOnInit() {

    }

}