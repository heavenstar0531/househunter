import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import ObjectId from 'bson-objectid';
import { AccApiCall, AccData } from 'src/app/common/requests/acc.data';
import { JsonStringifyReplacer, Status } from 'src/app/common/types';
import { environment } from 'src/environments/environment';
import { SeshService } from '../sesh/sesh.service';

@Injectable({
  providedIn: 'root'
})
export class AccService {
  private url: string = environment.serverUrl;

  constructor(
    private http: HttpClient,
    private session: SeshService,
    private router: Router,
  ) { }
  
  // ------------------------------------------------------------- //
  // PUT   async add( acc: AccData ): Promise<[ Status, ObjectId?/*acc_id*/ ]>
  async add( acc: AccData ): Promise<[ Status, ObjectId?/*acc_id*/ ]>
  {
    try
    {
      AccApiCall.ensureValid( this.session.acc_type, "add", acc );

      let headers = new HttpHeaders().set( "Content-Type", "application/json" );
      let res = await this.http.put( `${this.url}/acc/add`, JSON.stringify( acc, JsonStringifyReplacer ), { headers } ).toPromise() as [ Status, ObjectId? ];

      return res;
    }
    catch( err )
    {
      if( err instanceof Status ) return [ err ];
      throw err;
    }
  }

  // PUT   async delete( acc_id: ObjectId ): Promise<Status>
  async delete( acc_id: ObjectId ): Promise<Status>
  {
    try
    {
      AccApiCall.ensureValid( this.session.acc_type, "delete", acc_id );

      let headers = new HttpHeaders().set( "Content-Type", "application/json" );
      let res = await this.http.put( `${this.url}/acc/delete`, JSON.stringify( acc_id, JsonStringifyReplacer ), { headers } ).toPromise() as Status;

      return res;
    }
    catch( err )
    {
      if( err instanceof Status ) return err;
      throw err;
    }
  }

  // POST   async get( acc_id: ObjectId ): Promise<[ Status, AccData? ]>
  async get( acc_id: ObjectId ): Promise<[ Status, AccData? ]>
  {
    try
    {
      AccApiCall.ensureValid( this.session.acc_type, "get", acc_id );

      let headers = new HttpHeaders().set( "Content-Type", "application/json" );
      let res = await this.http.post( `${this.url}/acc/get`, JSON.stringify( acc_id, JsonStringifyReplacer ), { headers } ).toPromise() as [ Status, AccData? ];

      return res;
    }
    catch( err )
    {
      if( err instanceof Status ) return [ err ];
      throw err;
    }
  }

  // POST   async list(): Promise<[ Status, Array<AccData>? ]>
  async list(): Promise<[ Status, Array<AccData>? ]>
  {
    try
    {
      AccApiCall.ensureValid( this.session.acc_type, "list" );

      let headers = new HttpHeaders().set( "Content-Type", "application/json" );
      let res = await this.http.post( `${this.url}/acc/list`, JSON.stringify( {}, JsonStringifyReplacer ), { headers } ).toPromise() as [ Status, Array<AccData>? ];

      return res;
    }
    catch( err )
    {
      if( err instanceof Status ) return [ err ];
      throw err;
    }
  }


  // ------------------------------------------------------------- //
  // POST   async login( username: string, password: string ): Promise<[ Status, AccData? ]>
  async login( username: string, password: string ): Promise<[ Status, AccData? ]>
  {
    try
    {
      AccApiCall.ensureValid( "gst", "login", username, password );

      let headers = new HttpHeaders().set( "Content-Type", "application/json" );
      let [ status, acc ] = ( await this.http.post( `${this.url}/acc/login`, JSON.stringify( { username, password }, JsonStringifyReplacer ), { headers } ).toPromise() ) as [ Status, AccData? ];
      
      if( status.getStatus() != Status.SUCCESS || !acc ) return [ status, acc ];

      if( acc._id      ) this.session.acc_id   = acc._id;
      if( acc.acc_type ) this.session.acc_type = acc.acc_type;

      this.router.navigate( [''] );
      return [ status, acc ];
    }
    catch( err )
    {
      if( err instanceof Status ) return [ err ];
      throw err;
    }
  }

  // POST   async logout(): Promise<Status>
  async logout(): Promise<Status>
  {
    try
    {
      AccApiCall.ensureValid( this.session.acc_type, "logout" );

      let headers = new HttpHeaders().set( "Content-Type", "application/json" );
      let res = await this.http.post( `${this.url}/acc/logout`, JSON.stringify( {}, JsonStringifyReplacer ), { headers } ).toPromise() as Status;

      this.session.destroy();
      return res;
    }
    catch( err )
    {
      if( err instanceof Status ) return err;
      throw err;
    }
  }


  // ------------------------------------------------------------- //
  // PUT   async updateInfo( updated_acc: AccData ): Promise<Status>
  async updateInfo( updated_acc: AccData ): Promise<Status>
  {
    try
    {
      AccApiCall.ensureValid( this.session.acc_type, "updateInfo", this.session.acc_id, updated_acc );

      let headers = new HttpHeaders().set( "Content-Type", "application/json" );
      let res = await this.http.put( `${this.url}/acc/updateInfo`, JSON.stringify( updated_acc, JsonStringifyReplacer ), { headers } ).toPromise() as Status;

      return res;
    }
    catch( err )
    {
      if( err instanceof Status ) return err;
      throw err;
    }
  }

  // PUT   async updateStatus( updated_acc: AccData ): Promise<Status>
  async updateStatus( updated_acc: AccData ): Promise<Status>
  {
    try
    {
      AccApiCall.ensureValid( this.session.acc_type, "updateStatus", this.session.acc_id, updated_acc );

      let headers = new HttpHeaders().set( "Content-Type", "application/json" );
      let res = await this.http.put( `${this.url}/acc/updateStatus`, JSON.stringify( updated_acc, JsonStringifyReplacer ), { headers } ).toPromise() as Status;

      return res;
    }
    catch( err )
    {
      if( err instanceof Status ) return err;
      throw err;
    }
  }


  // ------------------------------------------------------------- //
  // PUT   async blockAnother( blocked_acc_id: ObjectId, is_blocked: boolean ): Promise<Status>
  async blockAnother( blocked_acc_id: ObjectId, is_blocked: boolean ): Promise<Status>
  {
    try
    {
      AccApiCall.ensureValid( this.session.acc_type, "blockAnother", blocked_acc_id, is_blocked );

      let headers = new HttpHeaders().set( "Content-Type", "application/json" );
      let res = await this.http.put( `${this.url}/acc/blockAnother`, JSON.stringify( { blocked_acc_id, is_blocked }, JsonStringifyReplacer ), { headers } ).toPromise() as Status;

      return res;
    }
    catch( err )
    {
      if( err instanceof Status ) return err;
      throw err;
    }
  }
}
