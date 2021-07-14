import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectId } from 'mongodb';
import { FileApiCall, FileData } from 'src/app/common/requests/file.data';
import { Status } from 'src/app/common/types';
import { SeshService } from '../sesh/sesh.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

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
      let res = await this.http.post( '/file/add', file ).toPromise() as Promise<[ Status, ObjectId? ]>;
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
      let res = await this.http.post( '/file/get', file_id ).toPromise() as Promise<[ Status, FileData? ]>;
      return res;
    }
    catch( err )
    {
      if( err instanceof Status ) return [ err ];
      throw err;
    }
  }
}
