import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { JsonParseReviver } from 'src/app/common/types'

@Injectable()
export class JsonHttpInterceptor implements HttpInterceptor {
  constructor() {}

  intercept( request: HttpRequest<unknown>, next: HttpHandler ): Observable<HttpEvent<unknown>> {
    return next
      .handle( request )
      .pipe( map( event => this.parseResponse( event ) ) );
  }

  private parseResponse( event: HttpEvent<any> ): HttpEvent<any> {
    if( !( event instanceof HttpResponse )
     || !( event?.headers?.get( "Content-Type" ) ?? "" ).includes( "application/json" ) ) return event;

    let body_old = JSON.stringify( event.body );   // undo the JSON.parse that was previously done by the default angular http interceptor
    let body_new = JSON.parse( body_old, JsonParseReviver );   // parse the response the good way

    let response = event.clone({ body: body_new });
    return response;
  }
}
