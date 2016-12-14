import { MovieService } from './movie.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MovieResolver implements Resolve<any> {
    constructor(
        private movieService: MovieService,
        private router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot): Promise<any> {

        const path = route.routeConfig.path;


        if (path == "popular")
            return this.movieService.getPopular()
                .catch(err => {
                    console.error("err happend", err)
                    if (err.status == 403) this.router.navigate(['/login']);
                    return err;
                })
        if (path == "trending")
            return this.movieService.getTrending()
                .catch(err => {
                    console.error("err happend", err)
                    if (err.status == 403) this.router.navigate(['/login']);
                    return err;
                })
        if (path == ":id")
            return this.movieService.getMovie(route.params['id'])
                .catch(err => {
                    console.error("err happend", err)
                    if (err.status == 403) this.router.navigate(['/login']);
                    return err;
                })


    }
}