import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AccLoginData, AccRegisterData } from 'src/app/requests/acc';

@Injectable({
  providedIn: 'root'
})
export class AccService {

  constructor(private router: Router) { }

  login( data: AccLoginData ): void {
    if( !data.simpleValidate() ) return;

  }

  register( data: AccRegisterData ): void {
    if( !data.simpleValidate() ) return;
  }

  logout(): void {
    
  }

  redirect( acctype: string ): void {
  }
}
