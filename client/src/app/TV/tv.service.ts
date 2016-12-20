import { AppConfig, APP_CONFIG } from './../app-config';
import { UserService } from './../User/user.service';
import { Http, Request, RequestMethod, URLSearchParams } from '@angular/http';
import { Injectable, Inject } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';



@Injectable()
export class TvService {

    constructor(private http: Http, private user: UserService, @Inject(APP_CONFIG) public config: AppConfig, ) {
        console.log(this.config)
    }

    private getTVImages(seriesID: number): any {
        console.log('searching images for::', seriesID);

        let requestOptions = new Request({
            method: RequestMethod.Get,
            url: this.config.tmdbApiEndpoint + "/tv/" + seriesID,
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
            url: this.config.traktApiEndpoint + "/shows/popular",
            search: requestSearchParams,
            headers: this.user.trakt_http_headers
        });



        return this.http.request(requestOptions)
            .do(console.log.bind(console))
            .map(response => response.json())
            .toPromise()
            .then(shows => shows.map(show => Promise.all([show, this.getTVImages(show.ids.tmdb)])))
            .then(shows => Promise.all(shows))
            .then(shows => shows.map(([showData, showImages]) => Object.assign(showData, showImages)))

        //.then(console.log.bind(console))
    }

    public getTrending(page: string = '1', limit: string = '25'): any {

        let requestSearchParams = new URLSearchParams();
        requestSearchParams.append('page', page || '1')
        requestSearchParams.append('limit', limit || '25')

        let requestOptions = new Request({
            method: RequestMethod.Get,
            url: this.config.traktApiEndpoint + "/shows/trending",
            search: requestSearchParams,
            headers: this.user.trakt_http_headers
        });


        return this.http.request(requestOptions)
            .map(response => response.json())
            .map(response => response.map(({show, watchers}) => {
                show.watchers = watchers
                return show;
            }))
            .toPromise()
            .then(shows => shows.map(show => Promise.all([show, this.getTVImages(show.ids.tmdb)])))
            .then(shows => Promise.all(shows))
            .then(shows => shows.map(([showData, showImages]) => Object.assign(showData, showImages)))

        //.then(console.log.bind(console))
    }

    public getShow(id: string): Promise<any> {

        let requestOptions = new Request({
            method: RequestMethod.Get,
            url: this.config.traktApiEndpoint + "/shows/" + id,
            search: "extended=full",
            headers: this.user.trakt_http_headers
        });

        return this.http.request(requestOptions)
            .map(response => response.json())
            .do(console.log.bind(console))
            .toPromise()
            .then(show => Promise.all([show, this.getTVImages(show.ids.tmdb)]))
            .then(([showData, showImages]) => Object.assign(showData, showImages))

        //.then(console.log.bind(console))
    }

    public getSeasons(id: string): Promise<any> {

        let requestOptions = new Request({
            method: RequestMethod.Get,
            url: this.config.traktApiEndpoint + "/shows/" + id + "/seasons",
            search: "extended=full",
            headers: this.user.trakt_http_headers
        });

        return this.http.request(requestOptions)
            .map(response => response.json())
            .do(console.log.bind(console))
            .toPromise()

        //.then(console.log.bind(console))
    }

}