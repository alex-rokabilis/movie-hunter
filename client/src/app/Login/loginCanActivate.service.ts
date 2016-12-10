import { UserService } from './../User/user.service';
import { Injectable } from '@angular/core';
import { CanActivate,Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CanActivateLogin implements CanActivate {
  
  constructor(private user:UserService,private router: Router) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):Promise<boolean> {
    
    return this.user.check().toPromise()
        .then( () => {
            this.router.navigate(['/home']);
            return false;
        })
        .catch( () => true)
  }
}