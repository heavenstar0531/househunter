import { Component, OnInit } from '@angular/core';
import { Routes, Route } from '@angular/router';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { appRoutes } from 'src/app/app-routing.module';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  routes: Routes = appRoutes;
  activeNavItems: string[] = ['', ''];
  collapsed: boolean = true;

  constructor(
    private breadcrumbService: BreadcrumbService,
  ) {
    let activeNavItems = JSON.parse( sessionStorage.getItem( 'activeNavItems' ) ?? '[]' );
    this.activeNavItems = ( activeNavItems != [] ) ? activeNavItems : ['', ''];
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    sessionStorage.setItem( 'activeNavItems', JSON.stringify( this.activeNavItems ) );
  }

  activeNavItemChanged( $event: NgbNavChangeEvent, idx: number ) {
    this.activeNavItems[idx] = $event.nextId;
  }

  logout() {
    
  }


  getRouteLabel( route: Route ): string {
    return route.data?.breadcrumb['label'] ?? '';
  }

  getRoutes(): Routes {
    return this.routes;
  }

  getSubroutes( route: Route ): Routes {
    let routes = route?.children ?? [];
    return routes.filter( ( r ) => this.getRouteLabel( r ) != '' );
  }
}
