import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AccLoginData } from 'src/app/objects/acc';

@Injectable({
  providedIn: 'root'
})
export class AccService {

  constructor(private router: Router) { }

  login( data: AccLoginData ): void {
    if( !data.validate() ) return;

  }
}
