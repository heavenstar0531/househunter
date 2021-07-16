import { Component, OnInit } from '@angular/core';
import { Routes, Route } from '@angular/router';
import { appRoutes } from 'src/app/app-routing.module';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  routes: Routes = appRoutes;
  collapsed: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  getRouteLabel( route: Route ): string {
    return route.data?.breadcrumb['label'] ?? '';
  }

  getRoutes(): Routes {
    return this.routes;
  }

  getSubroutes( route: Route ): Routes {
    let routes = route.children ?? [];
    return routes.filter( ( route ) => this.getRouteLabel( route ) != '' );
  }
}
