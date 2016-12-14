import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'selector',
    template: `
        <h3>{{movie.title}}</h3>
        <div>
            <img src="{{movie.poster_path}}">
        </div>
        <pre>{{ movie | json}}</pre>
    `
})
export class MovieDetailsComponent implements OnInit {

    movie;
    constructor(private route: ActivatedRoute) { }

    ngOnInit() {

        this.route.data
            .pluck('movie')
            .subscribe((m) => this.movie = m)

    }

}