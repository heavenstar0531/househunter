import { Component, OnInit } from '@angular/core';
import { Routes, Route } from '@angular/router';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { appRoutes } from 'src/app/app-routing.module';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  routes: Routes = appRoutes;
  activeNavItems: String[] = ['', ''];

  constructor() {
    let activeNavItems = JSON.parse( sessionStorage.getItem( 'activeNavItems' ) ?? '[]' );
    this.activeNavItems = ( activeNavItems != [] ) ? activeNavItems : ['', ''];
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    sessionStorage.setItem( 'activeNavItems', JSON.stringify( this.activeNavItems ) );
  }

  getRouteLabel( route: Route ): String {
    return route.data?.breadcrumb['label'] ?? 'missing';
  }

  activeNavItemChanged( $event: NgbNavChangeEvent, idx: number ) {
    this.activeNavItems[idx] = $event.nextId;
  }

  logout() {
    
  }

}
