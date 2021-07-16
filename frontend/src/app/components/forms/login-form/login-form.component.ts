import { Component, OnInit } from '@angular/core';
import { AccData } from 'src/app/common/requests/acc.data';
import { Status } from 'src/app/common/types';
import { AccService } from 'src/app/services/acc/acc.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.sass']
})
export class LoginFormComponent implements OnInit {
  status: Status = new Status();
  username: string = "";
  password: string = "";

  constructor(
    private accService: AccService,
  ) { }

  ngOnInit(): void {
  }

  async login(): Promise<[ Status, AccData? ]> {
    let [ status, acc ] = await this.accService.login( this.username, this.password );

    this.status = status;
    return [ status, acc ];
  }

  reset(): void {
    this.status = new Status();
    this.username = "";
    this.password = "";
  }
}
