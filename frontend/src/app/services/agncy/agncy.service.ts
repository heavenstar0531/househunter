import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AgncyApiCall, AgncyData } from 'src/app/common/requests/agncy.data';
import { Status } from 'src/app/common/types';
import { SeshService } from '../sesh/sesh.service';

@Injectable({
  providedIn: 'root'
})
export class AgncyService {

  constructor(
    private http: HttpClient,
    private session: SeshService,
  ) { }

  // ------------------------------------------------------------- //
  // POST   async get(): Promise<[ Status, AgncyData? ]>
  async get(): Promise<[ Status, AgncyData? ]>
  {
    try
    {
      AgncyApiCall.ensureValid( this.session.acc_type, "get" );
      let res = await this.http.post( '/agncy/get', {} ).toPromise() as Promise<[ Status, AgncyData? ]>;
      return res;
    }
    catch( err )
    {
      if( err instanceof Status ) return [ err ];
      throw err;
    }
  }

  // PUT   async update( updated_agncy: AgncyData ): Promise<Status>
  async update( updated_agncy: AgncyData ): Promise<Status>
  {
    try
    {
      AgncyApiCall.ensureValid( this.session.acc_type, "update", updated_agncy );
      let res = await this.http.put( '/agncy/update', updated_agncy ).toPromise() as Promise<Status>;
      return res;
    }
    catch( err )
    {
      if( err instanceof Status ) return err;
      throw err;
    }
  }
}
