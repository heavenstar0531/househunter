import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import ObjectId from 'bson-objectid';
import { AccData } from 'src/app/common/requests/acc.data';
import { FileData } from 'src/app/common/requests/file.data';
import { Status } from 'src/app/common/types';
import { AccService } from 'src/app/services/acc/acc.service';
import { SeshService } from 'src/app/services/sesh/sesh.service';

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
  usr_photo: null|File = null;
  password_old: string = "";
  password_new: string = "";

  sesh_acc_type: string = this.seshService.acc_type;
  sesh_acc_id: null|ObjectId = this.seshService.acc_id;


  constructor(
    private accService: AccService,
    private seshService: SeshService,
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

  async register(): Promise< [Status, ObjectId?/*acc_id*/] > {
    if( this.form_type != "register" ) return [ new Status().setError( "formtype.err", "invalid form type" ) ];

    let [ status, acc_id ] = await this.accService.add( this.acc, this.password_new );

    this.status = status;
    this.acc._id = acc_id;
    return [ status, acc_id ];
  }

  async update(): Promise<Status> {
    if( this.form_type != "update" ) return new Status().setError( "formtype.err", "invalid form type" );

    let status = await this.accService.updateInfo( this.acc_old, this.acc, this.password_old, this.password_new );

    this.status = status;
    if( this.status?.getStatus() == Status.SUCCESS ) this.acc_old = Object.assign( new AccData(), this.acc );
    return status;
  }

  async saveImage( usr_photo_input: any ) {
    this.usr_photo = usr_photo_input.files[ 0 ];
    if( !this.usr_photo ) return;

    let file = await FileData.from( this.usr_photo, this.sesh_acc_id );
    this.acc.usr_photo_id = file._id as ObjectId;
  }

  resetImage(): void {
    this.usr_photo = null;
    this.acc.usr_photo_id = null;
  }

  reset(): void {
    this.status = new Status();
    // copy enumerable properties from the old account object to the new one
    this.acc = Object.assign( new AccData(), this.acc_old );

    this.usr_photo = null;
    this.password_old = "";
    this.password_new = "";

    this.sesh_acc_type = this.seshService.acc_type;
  }
}
