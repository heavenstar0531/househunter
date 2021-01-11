import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void
  { }

  login() : void
  {
    // interesantno -- cast-ovanje JSON response-a u User tip
    this.userService.login( this.username, this.password ).subscribe( (user: User) => {
      if( !user ) return;

      localStorage.setItem( 'username', user.username );

      if     ( user.type == 0 ) this.router.navigate(['user']);
      else if( user.type == 1 ) this.router.navigate(['admin']);
    });
  }

}
