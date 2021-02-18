import { Component, OnInit } from '@angular/core';
import { Routes, Route, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';   // za lokalizaciju aplikacije
import { appRoutes } from 'src/app/app-routing.module';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  routes: Routes;

  constructor(
    public translate: TranslateService,
    public activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routes = appRoutes;
    this.routes.pop();   // uklanja poslednju praznu putanju
    this.translate.setDefaultLang( 'sr' );
  }

  getRouteLabel( route: Route ): String {
    return route.data.breadcrumb['label'];
  }
}
