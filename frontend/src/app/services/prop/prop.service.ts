import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stats } from 'fs';
import ObjectId from 'bson-objectid';
import { OfferData, PropApiCall, PropData } from 'src/app/common/requests/prop.data';
import { Criteria, JsonStringifyReplacer, Status } from 'src/app/common/types';
import { SeshService } from '../sesh/sesh.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropService {
  private url: string = environment.serverUrl;

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

      let headers = new HttpHeaders().set( "Content-Type", "application/json" );
      let res = await this.http.post( `${this.url}/prop/add`, JSON.stringify( prop, JsonStringifyReplacer ), { headers, withCredentials: true, } ).toPromise() as [ Status, ObjectId? ];

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

      let headers = new HttpHeaders().set( "Content-Type", "application/json" );
      let res = await this.http.post( `${this.url}/prop/addMany`, JSON.stringify( prop_list, JsonStringifyReplacer ), { headers, withCredentials: true, } ).toPromise() as [ Status, Array<ObjectId>? ];

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

      let headers = new HttpHeaders().set( "Content-Type", "application/json" );
      let res = await this.http.put( `${this.url}/prop/delete`, JSON.stringify( prop_id, JsonStringifyReplacer ), { headers, withCredentials: true, } ).toPromise() as Status;

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

      let headers = new HttpHeaders().set( "Content-Type", "application/json" );
      let res = await this.http.post( `${this.url}/prop/get`, JSON.stringify( prop_id, JsonStringifyReplacer ), { headers, withCredentials: true, } ).toPromise() as [ Status, PropData? ];

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

      let headers = new HttpHeaders().set( "Content-Type", "application/json" );
      let res = await this.http.post( `${this.url}/prop/list`, JSON.stringify( criteria, JsonStringifyReplacer ), { headers, withCredentials: true, } ).toPromise() as [ Status, Array<PropData>? ];

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

      let headers = new HttpHeaders().set( "Content-Type", "application/json" );
      let res = await this.http.put( `${this.url}/prop/updateInfo`, JSON.stringify( updated_prop, JsonStringifyReplacer ), { headers, withCredentials: true, } ).toPromise() as Status;

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

      let headers = new HttpHeaders().set( "Content-Type", "application/json" );
      let res = await this.http.put( `${this.url}/prop/updateStatus`, JSON.stringify( updated_prop, JsonStringifyReplacer ), { headers, withCredentials: true, } ).toPromise() as Status;

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

      let headers = new HttpHeaders().set( "Content-Type", "application/json" );
      let res = await this.http.put( `${this.url}/prop/rent`, JSON.stringify( { prop_id, from_dt, to_dt }, JsonStringifyReplacer ), { headers, withCredentials: true, } ).toPromise() as [ Status, number ];

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

      let headers = new HttpHeaders().set( "Content-Type", "application/json" );
      let res = await this.http.put( `${this.url}/prop/makePurchaseOffer`, JSON.stringify( { prop_id, offered_amount }, JsonStringifyReplacer ), { headers, withCredentials: true, } ).toPromise() as Status;

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

      let headers = new HttpHeaders().set( "Content-Type", "application/json" );
      let res = await this.http.put( `${this.url}/prop/acceptOrRejectPurchaseOffer`, JSON.stringify( { prop_id, offeror_id, accept }, JsonStringifyReplacer ), { headers, withCredentials: true, } ).toPromise() as Status;

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

      let headers = new HttpHeaders().set( "Content-Type", "application/json" );
      let res = await this.http.post( `${this.url}/prop/listPurchaseOffers`, JSON.stringify( prop_id, JsonStringifyReplacer ), { headers, withCredentials: true, } ).toPromise() as [ Status, Array< OfferData >? ];

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

      let headers = new HttpHeaders().set( "Content-Type", "application/json" );
      let res = await this.http.post( `${this.url}/prop/getStats`, JSON.stringify( criteria, JsonStringifyReplacer ), { headers, withCredentials: true, } ).toPromise() as [ Status, Stats? ];

      return res;
    }
    catch( err )
    {
      if( err instanceof Status ) return [ err ];
      throw err;
    }
  }
}
