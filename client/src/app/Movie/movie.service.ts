import { AppConfig, APP_CONFIG } from './../app-config';
import { UserService } from './../User/user.service';
import { Http, Request, RequestMethod, URLSearchParams } from '@angular/http';
import { Injectable, Inject } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';



@Injectable()
export class MovieService {

    constructor(private http: Http, private user: UserService, @Inject(APP_CONFIG) public config: AppConfig, ) {
        console.log(this.config)
    }

    private getMovieImages(movieID: number): any {
        console.log('searching images for::', movieID);

        let requestOptions = new Request({
            method: RequestMethod.Get,
            url: this.config.tmdbApiEndpoint + "/movie/" + movieID,
            search: "api_key=d26a0629dcc3f037723d6a91f4f46fc9"
        });



        return this.http.request(requestOptions)
            .map(response => response.json())
            .map(data => ({
                backdrop_path: data.backdrop_path ? this.config.tmdbApiBackdropEndpoint + data.backdrop_path : undefined,
                poster_path: data.poster_path ? this.config.tmdbApiPosterEndpoint + data.poster_path : undefined
            }))
            .catch(err => {
                console.error(err);
                return Observable.of({
                    backdrop_path: undefined,
                    poster_path: undefined
                })
            })
            .toPromise();

    }


    public getPopular(page: string = '1', limit: string = '25'): any {

        let requestSearchParams = new URLSearchParams();
        requestSearchParams.append('page', page )
        requestSearchParams.append('limit', limit)

        let requestOptions = new Request({
            method: RequestMethod.Get,
            url: this.config.traktApiEndpoint + "/movies/popular",
            search: requestSearchParams,
            headers: this.user.trakt_http_headers
        });



        return this.http.request(requestOptions)
            .do(console.log.bind(console))
            .map(response => response.json())
            .toPromise()
            .then(movies => movies.map(movie => Promise.all([movie, this.getMovieImages(movie.ids.tmdb)])))
            .then(movies => Promise.all(movies))
            .then(movies => movies.map(([movieData, movieImages]) => Object.assign(movieData, movieImages)))

        //.then(console.log.bind(console))
    }

    public getTrending(page: string = '1', limit: string = '25'): any {

        let requestSearchParams = new URLSearchParams();
        requestSearchParams.append('page', page || '1')
        requestSearchParams.append('limit', limit || '25')

        let requestOptions = new Request({
            method: RequestMethod.Get,
            url: this.config.traktApiEndpoint + "/movies/trending",
            search: requestSearchParams,
            headers: this.user.trakt_http_headers
        });


        return this.http.request(requestOptions)
            .map(response => response.json())
            .map(response => response.map(({movie, watchers}) => {
                movie.watchers = watchers
                return movie;
            }))
            .toPromise()
            .then(movies => movies.map(movie => Promise.all([movie, this.getMovieImages(movie.ids.tmdb)])))
            .then(movies => Promise.all(movies))
            .then(movies => movies.map(([movieData, movieImages]) => Object.assign(movieData, movieImages)))

        //.then(console.log.bind(console))
    }

    public getMovie(id: string): Promise<any> {

        let requestOptions = new Request({
            method: RequestMethod.Get,
            url: this.config.traktApiEndpoint + "/movies/" + id,
            search: "extended=full",
            headers: this.user.trakt_http_headers
        });

        return this.http.request(requestOptions)
            .map(response => response.json())
            .do(console.log.bind(console))
            .toPromise()
            .then(movie => Promise.all([movie, this.getMovieImages(movie.ids.tmdb)]))
            .then(([movieData, movieImages]) => Object.assign(movieData, movieImages))

        //.then(console.log.bind(console))
    }

}