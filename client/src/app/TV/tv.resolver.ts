import { TvService } from './tv.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class TvResolver implements Resolve<any> {
    constructor(
        private tvService: TvService,
        private router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot): Promise<any> {

        const path = route.routeConfig.path;

        if (path == "popular")
            return this.tvService.getPopular(route.params['page'])
                .catch(err => {
                    console.error("err happend", err)
                    if (err.status == 403) this.router.navigate(['/login']);
                    return err;
                })
        if (path == "trending")
            return this.tvService.getTrending(route.params['page'])
                .catch(err => {
                    console.error("err happend", err)
                    if (err.status == 403) this.router.navigate(['/login']);
                    return err;
                })
        if (path == ":id")
            return this.tvService.getShow(route.params['id'])
                .catch(err => {
                    console.error("err happend", err)
                    if (err.status == 403) this.router.navigate(['/login']);
                    return err;
                })


    }
}