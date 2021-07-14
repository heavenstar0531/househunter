import { Router } from 'express';
import { Session } from '../util/types';
import { ObjectId } from 'mongodb';
import { PropApiCall, PropData } from '../common/requests/prop.data';
import { Criteria, Status } from '../common/types';
import { PropModel } from '../models/prop.model';
import { NativeError } from 'mongoose';

export class PropApi
{
    static register( router: Router ): void
    {
        // ------------------------------------------------------------- //
        // POST   async add( prop: PropData ): Promise<[ Status, ObjectId?/*prop_id*/ ]>
        router.route( '/prop/add' ).post( async ( request, response ) => {
            try
            {
                let session = request.session as Session;
                let prop = Object.assign( new PropData(), request.body.prop );
                PropApiCall.ensureValid( session.acc_type, "add", prop );
                
                let res = await new PropModel( request.session ).add( prop );
                response.status( 200 ).json( res );
            }
            catch( err )
            {
                if     ( err instanceof Status      ) console.log( err );
                else if( err instanceof NativeError ) console.log( err );
                else                                  throw err;
                
                let res = [ new Status().setError( "message", "could not add property" ) ];
                response.status( 200 ).json( res );
            }
        });

        // POST   async addMany( prop_list: Array<PropData> ): Promise<[ Status, Array<ObjectId>?/*prop_list*/ ]>
        router.route( '/prop/addMany' ).post( async ( request, response ) => {
            try
            {
                let session = request.session as Session;
                let prop_list_src = request.body.prop_list as Array<PropData>;
                let prop_list = new Array<PropData>();
                for( let i = 0; i < prop_list_src.length; i++ )
                {
                    prop_list.push( Object.assign( new PropData(), prop_list_src[ i ] ) );
                }
                PropApiCall.ensureValid( session.acc_type, "addMany", prop_list );
                
                let res = await new PropModel( request.session ).addMany( prop_list );
                response.status( 200 ).json( res );
            }
            catch( err )
            {
                if     ( err instanceof Status      ) console.log( err );
                else if( err instanceof NativeError ) console.log( err );
                else                                  throw err;
                
                let res = [ new Status().setError( "message", "could not add properties from given list" ) ];
                response.status( 200 ).json( res );
            }
        });

        // PUT   async delete( prop_id: ObjectId ): Promise<Status>
        router.route( '/prop/delete' ).put( async ( request, response ) => {
            try
            {
                let session = request.session as Session;
                let prop_id = Object.assign( new ObjectId(), request.body.prop_id );
                PropApiCall.ensureValid( session.acc_type, "delete", prop_id );
                
                let res = await new PropModel( request.session ).delete( prop_id );
                response.status( 200 ).json( res );
            }
            catch( err )
            {
                if     ( err instanceof Status      ) console.log( err );
                else if( err instanceof NativeError ) console.log( err );
                else                                  throw err;
                
                let res = new Status().setError( "message", "could not delete property" );
                response.status( 200 ).json( res );
            }
        });
        
        // POST   async get( prop_id: ObjectId ): Promise<[ Status, PropData? ]>
        router.route( '/prop/get' ).post( async ( request, response ) => {
            try
            {
                let session = request.session as Session;
                let prop_id = Object.assign( new ObjectId(), request.body.prop_id );
                PropApiCall.ensureValid( session.acc_type, "get", prop_id );
                
                let res = await new PropModel( request.session ).get( prop_id );
                response.status( 200 ).json( res );
            }
            catch( err )
            {
                if     ( err instanceof Status      ) console.log( err );
                else if( err instanceof NativeError ) console.log( err );
                else                                  throw err;
                
                let res = [ new Status().setError( "message", "could not get property" ) ];
                response.status( 200 ).json( res );
            }
        });

        // POST   async list( criteria: Criteria ): Promise<[ Status, Array<PropData>? ]>
        router.route( '/prop/list' ).post( async ( request, response ) => {
            try
            {
                let session = request.session as Session;
                let criteria = Object.assign( new Criteria(), request.body.criteria );
                PropApiCall.ensureValid( session.acc_type, "list", criteria );
                
                let res = await new PropModel( request.session ).list( criteria );
                response.status( 200 ).json( res );
            }
            catch( err )
            {
                if     ( err instanceof Status      ) console.log( err );
                else if( err instanceof NativeError ) console.log( err );
                else                                  throw err;
                
                let res = [ new Status().setError( "message", "could not list properties" ) ];
                response.status( 200 ).json( res );
            }
        });


        // ------------------------------------------------------------- //
        // PUT   async updateInfo( updated_prop: PropData ): Promise<Status>
        router.route( '/prop/updateInfo' ).put( async ( request, response ) => {
            try
            {
                let session = request.session as Session;
                let updated_prop = Object.assign( new PropData(), request.body.updated_prop );
                PropApiCall.ensureValid( session.acc_type, "updateInfo", updated_prop );
                
                let res = await new PropModel( request.session ).updateInfo( updated_prop );
                response.status( 200 ).json( res );
            }
            catch( err )
            {
                if     ( err instanceof Status      ) console.log( err );
                else if( err instanceof NativeError ) console.log( err );
                else                                  throw err;
                
                let res = new Status().setError( "message", "could not update property info" );
                response.status( 200 ).json( res );
            }
        });

        // PUT   async updateStatus( updated_prop: PropData ): Promise<Status>
        router.route( '/prop/updateStatus' ).put( async ( request, response ) => {
            try
            {
                let session = request.session as Session;
                let updated_prop = Object.assign( new PropData(), request.body.updated_prop );
                PropApiCall.ensureValid( session.acc_type, "updateStatus", updated_prop );
                
                let res = await new PropModel( request.session ).updateStatus( updated_prop );
                response.status( 200 ).json( res );
            }
            catch( err )
            {
                if     ( err instanceof Status      ) console.log( err );
                else if( err instanceof NativeError ) console.log( err );
                else                                  throw err;
                
                let res = new Status().setError( "message", "could not update property status" );
                response.status( 200 ).json( res );
            }
        });


        // ------------------------------------------------------------- //
        // PUT   async rent( prop_id: ObjectId, from_dt: Date, to_dt: Date ): Promise<[ Status, number?/*cost*/ ]>
        router.route( '/prop/rent' ).put( async ( request, response ) => {
            try
            {
                let session = request.session as Session;
                let prop_id = Object.assign( new ObjectId(), request.body.prop_id );
                let from_dt = Object.assign( new Date(), request.body.from_dt );
                let to_dt = Object.assign( new Date(), request.body.to_dt );
                PropApiCall.ensureValid( session.acc_type, "rent", prop_id, from_dt, to_dt );
                
                let res = await new PropModel( request.session ).rent( prop_id, from_dt, to_dt );
                response.status( 200 ).json( res );
            }
            catch( err )
            {
                if     ( err instanceof Status      ) console.log( err );
                else if( err instanceof NativeError ) console.log( err );
                else                                  throw err;
                
                let res = [ new Status().setError( "message", "could not rent property" ) ];
                response.status( 200 ).json( res );
            }
        });


        // ------------------------------------------------------------- //
        // PUT    async makePurchaseOffer( prop_id: ObjectId, offered_amount: number ): Promise<Status>
        router.route( '/prop/makePurchaseOffer' ).put( async ( request, response ) => {
            try
            {
                let session = request.session as Session;
                let prop_id = Object.assign( new ObjectId(), request.body.prop_id );
                let offered_amount = Object.assign( new Number(), request.body.offered_amount );
                PropApiCall.ensureValid( session.acc_type, "makePurchaseOffer", prop_id, offered_amount );
                
                let res = await new PropModel( request.session ).makePurchaseOffer( prop_id, offered_amount );
                response.status( 200 ).json( res );
            }
            catch( err )
            {
                if     ( err instanceof Status      ) console.log( err );
                else if( err instanceof NativeError ) console.log( err );
                else                                  throw err;
                
                let res = new Status().setError( "message", "could not make purchase offer on property" );
                response.status( 200 ).json( res );
            }
        });

        // PUT   async acceptOrRejectPurchaseOffer( prop_id: ObjectId, offeror_id: ObjectId, accept: boolean ): Promise<Status>
        router.route( '/prop/acceptOrRejectPurchaseOffer' ).put( async ( request, response ) => {
            try
            {
                let session = request.session as Session;
                let prop_id = Object.assign( new ObjectId(), request.body.prop_id );
                let offeror_id = Object.assign( new ObjectId(), request.body.offeror_id );
                let accept = Object.assign( new Boolean(), request.body.accept );
                PropApiCall.ensureValid( session.acc_type, "acceptOrRejectPurchaseOffer", prop_id, offeror_id, accept );
                
                let res = await new PropModel( request.session ).acceptOrRejectPurchaseOffer( prop_id, offeror_id, accept );
                response.status( 200 ).json( res );
            }
            catch( err )
            {
                if     ( err instanceof Status      ) console.log( err );
                else if( err instanceof NativeError ) console.log( err );
                else                                  throw err;
                
                let res = new Status().setError( "message", "could not make purchase offer on property" );
                response.status( 200 ).json( res );
            }
        });

        // POST   async listPurchaseOffers( prop_id: ObjectId ): Promise<[ Status, Array< OfferData >? ]>
        router.route( '/prop/listPurchaseOffers' ).post( async ( request, response ) => {
            try
            {
                let session = request.session as Session;
                let prop_id = Object.assign( new ObjectId(), request.body.prop_id );
                PropApiCall.ensureValid( session.acc_type, "listPurchaseOffers", prop_id );
                
                let res = await new PropModel( request.session ).listPurchaseOffers( prop_id );
                response.status( 200 ).json( res );
            }
            catch( err )
            {
                if     ( err instanceof Status      ) console.log( err );
                else if( err instanceof NativeError ) console.log( err );
                else                                  throw err;
                
                let res = new Status().setError( "message", "could not list purchase offers for property" );
                response.status( 200 ).json( res );
            }
        });


        // ------------------------------------------------------------- //
        // POST   async getStats( criteria: Criteria ): Promise<[ Status, Stats? ]>
        router.route( '/prop/getStats' ).post( async ( request, response ) => {
            try
            {
                let session = request.session as Session;
                PropApiCall.ensureValid( session.acc_type, "getStats" );
                
                let res = await new PropModel( request.session ).getStats();
                response.status( 200 ).json( res );
            }
            catch( err )
            {
                if     ( err instanceof Status      ) console.log( err );
                else if( err instanceof NativeError ) console.log( err );
                else                                  throw err;
                
                let res = new Status().setError( "message", "could not get stats for properties" );
                response.status( 200 ).json( res );
            }
        });
    }
}

