import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import ObjectId from 'bson-objectid';
import { OfferData, PropData, RentData } from 'src/app/common/requests/prop.data';
import { Status } from 'src/app/common/types';
import { PropService } from 'src/app/services/prop/prop.service';
import { SeshService } from 'src/app/services/sesh/sesh.service';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.sass']
})
export class PropertyFormComponent implements OnInit {
  @Input( "form_type" )
  form_type: string = "add";
  @Input( "prop_old" )
  prop_old: PropData = new PropData();   // read only
  @Input( "readonly" )
  readonly: boolean = false;

  status: Status = new Status();
  prop: PropData = new PropData();


  constructor(
    private sesh: SeshService,
    private propService: PropService,
  ) { }

  ngOnInit(): void {
    if( this.form_type == "add" )
    {
      this.prop_old = new PropData();
      // ----------------
      // this.prop_old._id;
      this.prop_old.name                = "";
      this.prop_old.addr_city           = "";
      this.prop_old.addr_district       = "";
      this.prop_old.addr_street         = "";
      this.prop_old.addr_streetnum      = "";
      this.prop_old.prop_type           = "flat";
      this.prop_old.flat_floornum       = undefined;
      this.prop_old.floorcnt            = undefined;
      this.prop_old.area_m2             = undefined;
      this.prop_old.roomcnt             = undefined;
      this.prop_old.is_furnished        = true;
      this.prop_old.gallery             = new Array<ObjectId>();
      this.prop_old.owner_id            = this.sesh.acc_id ?? new ObjectId();
      // ----------------
      this.prop_old.prop_sale_type      = "rent";
      this.prop_old.price               = undefined;
      this.prop_old.rent_list           = new Array<RentData>();    // remove before saving
      this.prop_old.sale_offer_list     = new Array<OfferData>();   // remove before saving
      this.prop_old.sale_arbiter_id     = null;
      // ----------------
      this.prop_old.accepted_dt         = null;
      this.prop_old.sold_dt             = null;
      this.prop_old.deleted_dt          = null;
      this.prop_old.is_promoted         = false;
      this.prop_old.viewcnt             = 0;
    }

    this.reset();
  }

  ngOnChanges( _: SimpleChanges ): void {
    this.reset();
  }

  // TODO
  async add(): Promise< [Status, ObjectId?/*acc_id*/] > {
    if( this.readonly ) return [ new Status().setError( "readonly.err", "cannot update readonly form" ) ];
    if( this.form_type != "add" ) return [ new Status().setError( "formtype.err", "invalid form type" ) ];

    let [ status, acc_id ] = await this.propService.add( this.prop );

    this.status = status;
    this.prop._id = acc_id;
    return [ status, acc_id ];
  }

  async update(): Promise<Status> {
    if( this.readonly ) return new Status().setError( "readonly.err", "cannot update readonly form" );
    if( this.form_type != "update" ) return new Status().setError( "formtype.err", "invalid form type" );

    let status = await this.propService.updateInfo( this.prop );

    this.status = status;
    return status;
  }

  reset(): void {
    this.status = new Status();
    // copy enumerable properties from the old account object to the new one
    this.prop = Object.assign( new PropData(), this.prop_old );
  }
}
