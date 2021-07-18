import { Injectable } from '@angular/core';
import ObjectId from 'bson-objectid';
import { JsonStringifyReplacer, JsonParseReviver } from 'src/app/common/types';

@Injectable({
  providedIn: 'root'
})
export class SeshService {
  constructor() { }

  get acc_id(): ObjectId|null
  {
    let acc_id: any = localStorage.getItem( "acc_id" );
    if( !acc_id ) return null;
    
    acc_id = JSON.parse( acc_id, JsonParseReviver ) as ObjectId;
    if( !acc_id ) return null;

    return acc_id;
  }
  
  set acc_id( acc_id: ObjectId|null )
  {
    localStorage.setItem( "acc_id", JSON.stringify( acc_id, JsonStringifyReplacer ) );
  }

  get acc_type(): string
  {
    return localStorage.getItem( "acc_type" ) ?? "gst";
  }

  set acc_type( acc_type: string )
  {
    if( !acc_type ) acc_type = "gst";
    localStorage.setItem( "acc_type", acc_type );
  }

  destroy(): void
  {
    localStorage.clear();
  }
}
