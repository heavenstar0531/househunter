import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ObjectId from 'bson-objectid';
import { FileApiCall, FileData } from 'src/app/common/requests/file.data';
import { JsonReplacer, Status } from 'src/app/common/types';
import { environment } from 'src/environments/environment';
import { SeshService } from '../sesh/sesh.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private url: string = environment.serverUrl;

  constructor(
    private http: HttpClient,
    private session: SeshService,
  ) { }

  // ------------------------------------------------------------- //
  // POST   async add( file: FileData ): Promise<[ Status, ObjectId?/*file_id*/ ]>
  async add( file: FileData ): Promise<[ Status, ObjectId?/*file_id*/ ]>
  {
    try
    {
      FileApiCall.ensureValid( this.session.acc_type, "add", file );
      let res = await this.http.post( `${this.url}/file/add`, JSON.stringify( file, JsonReplacer ) ).toPromise() as [ Status, ObjectId? ];
      return res;
    }
    catch( err )
    {
      if( err instanceof Status ) return [ err ];
      throw err;
    }
  }

  // POST   async get( file_id: ObjectId ): Promise<[ Status, FileData? ]>
  async get( file_id: ObjectId ): Promise<[ Status, FileData? ]>
  {
    try
    {
      FileApiCall.ensureValid( this.session.acc_type, "get", file_id );
      let res = await this.http.post( `${this.url}/file/get`, JSON.stringify( file_id, JsonReplacer ) ).toPromise() as [ Status, FileData? ];
      return res;
    }
    catch( err )
    {
      if( err instanceof Status ) return [ err ];
      throw err;
    }
  }
}
