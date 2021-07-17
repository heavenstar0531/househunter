import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SeshService } from '../services/sesh/sesh.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  constructor(
    private sesh: SeshService,
  ) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return true;
      // return this.sesh.acc_type in ( route.data?.acc_type ?? { } );   // TODO: restore
  }
  
}
