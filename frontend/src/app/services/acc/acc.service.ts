import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AccLoginData, AccRegisterData } from 'src/app/common/requests/acc.data';

@Injectable({
  providedIn: 'root'
})
export class AccService {

  // TODO: fix
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
