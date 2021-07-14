import { Injectable } from '@angular/core';
import { ObjectId } from 'mongodb';

@Injectable({
  providedIn: 'root'
})
export class SeshService {
  constructor() { }

  get acc_id(): ObjectId|null
  {
    let acc_id: any = localStorage.getItem( "acc_id" );
    if( !acc_id ) return null;
    
    acc_id = JSON.parse( acc_id );
    if( !acc_id ) return null;

    acc_id = Object.assign( new ObjectId(), acc_id );
    if( !acc_id ) return null;

    return acc_id as ObjectId;
  }
  
  get acc_type(): string
  {
    return localStorage.getItem( "acc_id" ) ?? "gst";
  }

  set acc_id( acc_id: ObjectId|null )
  {
    localStorage.setItem( "acc_id", JSON.stringify( acc_id ) );
  }

  set acc_type( acc_type: string|null )
  {
    if( !acc_type ) acc_type = "gst";
    localStorage.setItem( "acc_id", acc_type );
  }

  destroy(): void
  {
    localStorage.clear();
  }
}
