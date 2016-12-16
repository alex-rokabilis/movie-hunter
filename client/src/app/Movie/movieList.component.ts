import { MovieService } from './movie.service';
import { MovieModule } from './movie.module';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/pluck';

//'movie-thumb { width: 48%; margin-right: 2%;}',
@Component({
    selector:'movie-list',
    styles: [
        ':host { width:100%; margin-left: 2%;margin-right: 2%;margin-top: 10px; }',
        'movie-thumb { width: 32%; margin-right: 2%;}',
        'movie-thumb:nth-child(3n+5) { margin-right: 0; }',
        
        'movie-thumb:nth-child(1) { width: 48%; margin-right: 2%;}',
        'movie-thumb:nth-child(2) { width: 48%; margin-right: 0;}',
        ],
    template: `       
        <movie-thumb *ngFor='let movie of movies' [movie]='movie' ></movie-thumb>
        `
})
export class MovieListComponent implements OnInit {

    movies;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() { 
        console.log(this.route);
        this.route.data.pluck('movies').subscribe(  m => this.movies = m )
        //this.movieService.getTrending().then( m => this.movies = m)
    }
    
}