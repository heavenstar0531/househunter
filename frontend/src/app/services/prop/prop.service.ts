import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stats } from 'fs';
import ObjectId from 'bson-objectid';
import { OfferData, PropApiCall, PropData } from 'src/app/common/requests/prop.data';
import { Criteria, Status } from 'src/app/common/types';
import { SeshService } from '../sesh/sesh.service';

@Injectable({
  providedIn: 'root'
})
export class PropService {

  constructor(
    private http: HttpClient,
    private session: SeshService,
  ) { }

  // ------------------------------------------------------------- //
  // POST   async add( prop: PropData ): Promise<[ Status, ObjectId?/*prop_id*/ ]>
  async add( prop: PropData ): Promise<[ Status, ObjectId?/*prop_id*/ ]>
  {
    try
    {
      PropApiCall.ensureValid( this.session.acc_type, "add", prop );
      let res = await this.http.post( '/prop/add', prop ).toPromise() as [ Status, ObjectId? ];
      return res;
    }
    catch( err )
    {
      if( err instanceof Status ) return [ err ];
      throw err;
    }
  }

  // POST   async addMany( prop_list: Array<PropData> ): Promise<[ Status, Array<ObjectId>?/*prop_list*/ ]>
  async addMany( prop_list: Array<PropData> ): Promise<[ Status, Array<ObjectId>?/*prop_list*/ ]>
  {
    try
    {
      PropApiCall.ensureValid( this.session.acc_type, "addMany", prop_list );
      let res = await this.http.post( '/prop/addMany', prop_list ).toPromise() as [ Status, Array<ObjectId>? ];
      return res;
    }
    catch( err )
    {
      if( err instanceof Status ) return [ err ];
      throw err;
    }
  }

  // PUT   async delete( prop_id: ObjectId ): Promise<Status>
  async delete( prop_id: ObjectId ): Promise<Status>
  {
    try
    {
      PropApiCall.ensureValid( this.session.acc_type, "delete", prop_id );
      let res = await this.http.put( '/prop/delete', prop_id ).toPromise() as Status;
      return res;
    }
    catch( err )
    {
      if( err instanceof Status ) return err;
      throw err;
    }
  }

  // POST   async get( prop_id: ObjectId ): Promise<[ Status, PropData? ]>
  async get( prop_id: ObjectId ): Promise<[ Status, PropData? ]>
  {
    try
    {
      PropApiCall.ensureValid( this.session.acc_type, "get", prop_id );
      let res = await this.http.post( '/prop/get', prop_id ).toPromise() as [ Status, PropData? ];
      return res;
    }
    catch( err )
    {
      if( err instanceof Status ) return [ err ];
      throw err;
    }
  }

  // POST   async list( criteria: Criteria ): Promise<[ Status, Array<PropData>? ]>
  async list( criteria: Criteria ): Promise<[ Status, Array<PropData>? ]>
  {
    try
    {
      PropApiCall.ensureValid( this.session.acc_type, "list", criteria );
      let res = await this.http.post( '/prop/list', criteria ).toPromise() as [ Status, Array<PropData>? ];
      return res;
    }
    catch( err )
    {
      if( err instanceof Status ) return [ err ];
      throw err;
    }
  }


  // ------------------------------------------------------------- //
  // PUT   async updateInfo( updated_prop: PropData ): Promise<Status>
  async updateInfo( updated_prop: PropData ): Promise<Status>
  {
    try
    {
      PropApiCall.ensureValid( this.session.acc_type, "updateInfo", updated_prop );
      let res = await this.http.put( '/prop/updateInfo', updated_prop ).toPromise() as Status;
      return res;
    }
    catch( err )
    {
      if( err instanceof Status ) return err;
      throw err;
    }
  }

  // PUT   async updateStatus( updated_prop: PropData ): Promise<Status>
  async updateStatus( updated_prop: PropData ): Promise<Status>
  {
    try
    {
      PropApiCall.ensureValid( this.session.acc_type, "updateStatus", updated_prop );
      let res = await this.http.put( '/prop/updateStatus', updated_prop ).toPromise() as Status;
      return res;
    }
    catch( err )
    {
      if( err instanceof Status ) return err;
      throw err;
    }
  }


  // ------------------------------------------------------------- //
  // PUT   async rent( prop_id: ObjectId, from_dt: Date, to_dt: Date ): Promise<[ Status, number?/*cost*/ ]>
  async rent( prop_id: ObjectId, from_dt: Date, to_dt: Date ): Promise<[ Status, number?/*cost*/ ]>
  {
    try
    {
      PropApiCall.ensureValid( this.session.acc_type, "rent", prop_id, from_dt, to_dt );
      let res = await this.http.put( '/prop/rent', { prop_id, from_dt, to_dt } ).toPromise() as [ Status, number ];
      return res;
    }
    catch( err )
    {
      if( err instanceof Status ) return [ err ];
      throw err;
    }
  }

  // ------------------------------------------------------------- //
  // PUT    async makePurchaseOffer( prop_id: ObjectId, offered_amount: number ): Promise<Status>
  async makePurchaseOffer( prop_id: ObjectId, offered_amount: number ): Promise<Status>
  {
    try
    {
      PropApiCall.ensureValid( this.session.acc_type, "makePurchaseOffer", prop_id, offered_amount );
      let res = await this.http.put( '/prop/makePurchaseOffer', { prop_id, offered_amount } ).toPromise() as Status;
      return res;
    }
    catch( err )
    {
      if( err instanceof Status ) return err;
      throw err;
    }
  }

  // PUT   async acceptOrRejectPurchaseOffer( prop_id: ObjectId, offeror_id: ObjectId, accept: boolean ): Promise<Status>
  async acceptOrRejectPurchaseOffer( prop_id: ObjectId, offeror_id: ObjectId, accept: boolean ): Promise<Status>
  {
    try
    {
      PropApiCall.ensureValid( this.session.acc_type, "acceptOrRejectPurchaseOffer", prop_id, offeror_id, accept );
      let res = await this.http.put( '/prop/acceptOrRejectPurchaseOffer', { prop_id, offeror_id, accept } ).toPromise() as Status;
      return res;
    }
    catch( err )
    {
      if( err instanceof Status ) return err;
      throw err;
    }
  }

  // POST   async listPurchaseOffers( prop_id: ObjectId ): Promise<[ Status, Array< OfferData >? ]>
  async listPurchaseOffers( prop_id: ObjectId ): Promise<[ Status, Array< OfferData >? ]>
  {
    try
    {
      PropApiCall.ensureValid( this.session.acc_type, "listPurchaseOffers", prop_id );
      let res = await this.http.post( '/prop/listPurchaseOffers', prop_id ).toPromise() as [ Status, Array< OfferData >? ];
      return res;
    }
    catch( err )
    {
      if( err instanceof Status ) return [ err ];
      throw err;
    }
  }


  // ------------------------------------------------------------- //
  // POST   async getStats( criteria: Criteria ): Promise<[ Status, Stats? ]>
  async getStats( criteria: Criteria ): Promise<[ Status, Stats? ]>
  {
    try
    {
      PropApiCall.ensureValid( this.session.acc_type, "getStats" );
      let res = await this.http.post( '/prop/getStats', criteria ).toPromise() as [ Status, Stats? ];
      return res;
    }
    catch( err )
    {
      if( err instanceof Status ) return [ err ];
      throw err;
    }
  }
}
