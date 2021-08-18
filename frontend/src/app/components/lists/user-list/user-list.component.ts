import { Component, OnInit } from '@angular/core';
import { AccData } from 'src/app/common/requests/acc.data';
import { Status } from 'src/app/common/types';
import { AccService } from 'src/app/services/acc/acc.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass']
})
export class UserListComponent implements OnInit {
  acc_list: Array<AccData> = new Array<AccData>();

  constructor(
    private accService: AccService,
  ) { }

  ngOnInit(): void {
    this.accService.list().then( ( [ status, acc_list ] ) => {
      if( status.getStatus() !== Status.SUCCESS ) return;
      this.acc_list = acc_list!;
    } );
  }

  async activate( acc: AccData ) {
    acc.activated_dt = new Date();
    let status = await this.accService.updateStatus( acc );
    if( status.getStatus() != Status.SUCCESS ) acc.activated_dt = null;
  }

  async delete( acc: AccData ) {
    acc.deleted_dt = new Date();
    let status = await this.accService.updateStatus( acc );
    if( status.getStatus() == Status.SUCCESS ) this.acc_list = this.acc_list.filter( account => account._id != acc._id );
    else                                       acc.deleted_dt = null;
  }

}
