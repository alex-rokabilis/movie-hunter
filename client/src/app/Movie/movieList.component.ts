import { MovieService } from './movie.service';
import { MovieModule } from './movie.module';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/pluck';

@Component({
    template: `Movie List

        <div>
            <div>
                Sidebar
            </div>
        
            <div style="margin-left: 2%;margin-right: 2%;margin-top: 10px;">
                <div class="container" *ngFor="let movie of movies">
                    
                    <a [routerLink]='["/movie/" + movie.ids.slug]'>
                        <div style="background-color: #1d1d1d;position: relative;overflow: hidden;">
                            
                            <img style="min-height: 100%;position: relative; top: 0; left: 0;display: block;    width: 100%;vertical-align: middle;" 
                                src={{movie.backdrop_path}}>
                        
                        </div>
                        
                        <p>{{movie.title}}</p>
                    </a>
                </div>
            </div>
        </div>

        <style>
            .container{
                width: 23%;
                display: inline-table;
                margin-right: 2%;
                text-align: center;
            }
            .container:nth-child(4n+4) {  
                margin-right: 0;
            }
        
        </style>
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