import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';   // za slanje i parsiranje http zahteva
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor( private http: HttpClient ) { }

  login( username: String, password: String )
  {
    const data = { username: username, password: password };

    // grave accent je kao string sa duplim navodnicima u bash-u
    return this.http.post( `${environment.serverUrl}/login`, data );
  }

  register( username: String, password: String, email: String, type: Number )
  {
    const data = { 'username': username, 'password': password, 'email': email, 'type': type };
    return this.http.post( `${environment.serverUrl}/register`, data );
  }

  news()
  {
    return this.http.get( `${environment.serverUrl}/news` );
  }
}
