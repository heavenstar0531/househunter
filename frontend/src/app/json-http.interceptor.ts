import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { JsonReviver } from 'src/app/common/types'

@Injectable()
export class JsonHttpInterceptor implements HttpInterceptor {

  constructor() {}

  intercept( request: HttpRequest<unknown>, next: HttpHandler ): Observable<HttpEvent<unknown>> {
    return next.handle(request);
  }

  private handleJsonResponses( httpRequest: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    return next
      .handle( httpRequest.clone({ responseType: "text" }) )
      .pipe( map( event => this.parseResponse( event ) ) );
  }

  private parseResponse( event: HttpEvent<any> ): HttpEvent<any> {
    return event instanceof HttpResponse
      ? event.clone({ body: JSON.parse( event.body, JsonReviver ) })
      : event;
  }
}
