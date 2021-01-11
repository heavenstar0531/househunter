import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string;
  password: string;
  email: string;
  type: number;


  constructor( private userService: UserService ) { }

  ngOnInit(): void {
  }

  register()
  {
    this.userService.register( this.username, this.password, this.email, this.type ).subscribe( val => {
      if( val['user'] == 'ok' ) alert( 'User added' );
    });
  }

}
