import { TvService } from './tv.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SeasonsResolver implements Resolve<any> {
    constructor(
        private tvService: TvService,
        private router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot): Promise<any> {

        const resolverData = route.data['seasonsResolver']

        if (resolverData == "list")
            return this.tvService.getSeasons(route.params['id'])
                .catch(err => {
                    console.error("err happend", err)
                    if (err.status == 403) this.router.navigate(['/login']);
                    return err;
                })

        return Promise.reject("Resolver doesn't know what to do!")


    }
}