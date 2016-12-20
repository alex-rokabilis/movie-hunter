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

        //const path = route.routeConfig.path;

        const resolverData = route.data['tvResolver']

        if (resolverData == "popular")
            return this.tvService.getPopular(route.params['page'])
                .catch(err => {
                    console.error("err happend", err)
                    if (err.status == 403) this.router.navigate(['/login']);
                    return err;
                })
        if (resolverData == "trending")
            return this.tvService.getTrending(route.params['page'])
                .catch(err => {
                    console.error("err happend", err)
                    if (err.status == 403) this.router.navigate(['/login']);
                    return err;
                })
        if (resolverData == "single")
            return this.tvService.getShow(route.params['id'])
            .catch(err => {
                console.error("err happend", err)
                if (err.status == 403) this.router.navigate(['/login']);
                return err;
            })

        return Promise.reject("Resolver doesn't know what to do!")


    }
}