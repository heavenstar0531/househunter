import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';   // za slanje i parsiranje http zahteva

@Injectable({
  providedIn: 'root'
})
export class UserService {
  uri = 'http://localhost:4000';   // putanja express aplikacije

  constructor( private http: HttpClient ) { }

  login( username: String, password: String )
  {
    const data = { username: username, password: password };

    // grave accent je kao string sa duplim navodnicima u bash-u
    return this.http.post( `${this.uri}/login`, data );
  }

  register( username: String, password: String, email: String, type: Number )
  {
    const data = { 'username': username, 'password': password, 'email': email, 'type': type };
    return this.http.post( `${this.uri}/register`, data );
  }

  news()
  {
    return this.http.get( `${this.uri}/news` );
  }
}
