import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import ObjectId from 'bson-objectid';
import { AccData } from 'src/app/common/requests/acc.data';
import { Status } from 'src/app/common/types';
import { AccService } from 'src/app/services/acc/acc.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.sass']
})
export class AccountFormComponent implements OnInit {
  @Input( "form_type" )
  form_type: string = "register";
  @Input( "acc_old" )
  acc_old: AccData = new AccData();   // read only

  status: Status = new Status();
  acc: AccData = new AccData();


  constructor(
    private accService: AccService,
  ) { }

  ngOnInit(): void {
    if( this.form_type == "register" )
    {
      this.acc_old = new AccData();
      // ----------------
   // this.acc_old._id;
      this.acc_old.username = "";
      this.acc_old.password = "";
      this.acc_old.firstname = "";
      this.acc_old.lastname = "";
      this.acc_old.email = "";
      // ----------------
      this.acc_old.usr_photo_id = null;
      this.acc_old.usr_addr_country = "";
      this.acc_old.usr_addr_city = "";
      // ----------------
      this.acc_old.acc_type = "usr";
      this.acc_old.activated_dt = null;
      this.acc_old.deleted_dt = null;
      this.acc_old.usr_blocked_ids = new Array<ObjectId>();
    }

    this.reset();
  }

  ngOnChanges( _: SimpleChanges ): void {
    this.reset();
  }

  async update(): Promise< [Status, ObjectId?/*acc_id*/] > {
    if( this.form_type != "update" ) return [ new Status().setError( "formtype.err", "invalid form type" ) ];

    let [ status, acc_id ] = await this.accService.add( this.acc );

    this.status = status;
    this.acc._id = acc_id;
    return [ status, acc_id ];
  }

  async register(): Promise< [Status, ObjectId?/*acc_id*/] > {
    if( this.form_type != "register" ) return [ new Status().setError( "formtype.err", "invalid form type" ) ];

    let [ status, acc_id ] = await this.accService.add( this.acc );

    this.status = status;
    this.acc._id = acc_id;
    return [ status, acc_id ];
  }

  reset(): void {
    this.status = new Status();
    // copy enumerable properties from the old account object to the new one
    this.acc = Object.assign( new AccData(), this.acc_old );
  }
}
