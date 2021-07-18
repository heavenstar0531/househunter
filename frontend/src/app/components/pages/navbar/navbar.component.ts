import { Component, OnInit } from '@angular/core';
import { Routes, Route } from '@angular/router';
import { appRoutes } from 'src/app/app-routing.module';
import { AccService } from 'src/app/services/acc/acc.service';
import { SeshService } from 'src/app/services/sesh/sesh.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  routes: Routes = appRoutes;
  collapsed: boolean = true;

  constructor(
    private seshService: SeshService,
    private accService: AccService,
  ) {}

  ngOnInit(): void {}

  getRoutes(): Routes {
    return this.routes.filter( ( route ) => this.acc_type in ( route.data?.acc_type ?? { } ) );
  }

  getSubroutes( route: Route ): Routes {
    let routes = route.children ?? [];
    return routes.filter( ( route ) => this.getRouteLabel( route ) != '' );
  }

  getRouteLabel( route: Route ): string {
    return route.data?.breadcrumb[ 'label' ] ?? '';
  }

  get acc_type(): string { return this.seshService.acc_type; }

  async logout() {
    this.accService.logout();
  }
}
