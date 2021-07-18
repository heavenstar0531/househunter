import { Router } from 'express';
import { Session } from '../util/types';
import ObjectId from 'bson-objectid';
import { PropApiCall, PropData } from '../common/requests/prop.data';
import { Criteria, JsonStringifyReplacer, Status } from '../common/types';
import { PropModel } from '../models/prop.model';
import { Error } from 'mongoose';

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
                let prop = request.body.prop as PropData;
                PropApiCall.ensureValid( session.acc_type, "add", prop );
                
                let res = await new PropModel( request.session ).add( prop );
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
            catch( err )
            {
                if     ( err instanceof Status ) console.log( err );
                else if( err instanceof Error  ) console.log( err );
                else                             throw err;
                
                let res = [ new Status().setError( "message", "could not add property" ) ];
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
        });

        // POST   async addMany( prop_list: Array<PropData> ): Promise<[ Status, Array<ObjectId>?/*prop_list*/ ]>
        router.route( '/prop/addMany' ).post( async ( request, response ) => {
            try
            {
                let session = request.session as Session;
                let prop_list = request.body.prop_list as Array<PropData>;
                PropApiCall.ensureValid( session.acc_type, "addMany", prop_list );
                
                let res = await new PropModel( request.session ).addMany( prop_list );
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
            catch( err )
            {
                if     ( err instanceof Status ) console.log( err );
                else if( err instanceof Error  ) console.log( err );
                else                             throw err;
                
                let res = [ new Status().setError( "message", "could not add properties from given list" ) ];
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
        });

        // PUT   async delete( prop_id: ObjectId ): Promise<Status>
        router.route( '/prop/delete' ).put( async ( request, response ) => {
            try
            {
                let session = request.session as Session;
                let prop_id = request.body.prop_id as ObjectId;
                PropApiCall.ensureValid( session.acc_type, "delete", prop_id );
                
                let res = await new PropModel( request.session ).delete( prop_id );
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
            catch( err )
            {
                if     ( err instanceof Status ) console.log( err );
                else if( err instanceof Error  ) console.log( err );
                else                             throw err;
                
                let res = new Status().setError( "message", "could not delete property" );
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
        });
        
        // POST   async get( prop_id: ObjectId ): Promise<[ Status, PropData? ]>
        router.route( '/prop/get' ).post( async ( request, response ) => {
            try
            {
                let session = request.session as Session;
                let prop_id = request.body.prop_id as ObjectId;
                PropApiCall.ensureValid( session.acc_type, "get", prop_id );
                
                let res = await new PropModel( request.session ).get( prop_id );
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
            catch( err )
            {
                if     ( err instanceof Status ) console.log( err );
                else if( err instanceof Error  ) console.log( err );
                else                             throw err;
                
                let res = [ new Status().setError( "message", "could not get property" ) ];
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
        });

        // POST   async list( criteria: Criteria ): Promise<[ Status, Array<PropData>? ]>
        router.route( '/prop/list' ).post( async ( request, response ) => {
            try
            {
                let session = request.session as Session;
                let criteria = request.body.criteria as Criteria;
                PropApiCall.ensureValid( session.acc_type, "list", criteria );
                
                let res = await new PropModel( request.session ).list( criteria );
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
            catch( err )
            {
                if     ( err instanceof Status ) console.log( err );
                else if( err instanceof Error  ) console.log( err );
                else                             throw err;
                
                let res = [ new Status().setError( "message", "could not list properties" ) ];
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
        });


        // ------------------------------------------------------------- //
        // PUT   async updateInfo( updated_prop: PropData ): Promise<Status>
        router.route( '/prop/updateInfo' ).put( async ( request, response ) => {
            try
            {
                let session = request.session as Session;
                let updated_prop = request.body.updated_prop as PropData;
                PropApiCall.ensureValid( session.acc_type, "updateInfo", updated_prop );
                
                let res = await new PropModel( request.session ).updateInfo( updated_prop );
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
            catch( err )
            {
                if     ( err instanceof Status ) console.log( err );
                else if( err instanceof Error  ) console.log( err );
                else                             throw err;
                
                let res = new Status().setError( "message", "could not update property info" );
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
        });

        // PUT   async updateStatus( updated_prop: PropData ): Promise<Status>
        router.route( '/prop/updateStatus' ).put( async ( request, response ) => {
            try
            {
                let session = request.session as Session;
                let updated_prop = request.body.updated_prop as PropData;
                PropApiCall.ensureValid( session.acc_type, "updateStatus", updated_prop );
                
                let res = await new PropModel( request.session ).updateStatus( updated_prop );
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
            catch( err )
            {
                if     ( err instanceof Status ) console.log( err );
                else if( err instanceof Error  ) console.log( err );
                else                             throw err;
                
                let res = new Status().setError( "message", "could not update property status" );
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
        });


        // ------------------------------------------------------------- //
        // PUT   async rent( prop_id: ObjectId, from_dt: Date, to_dt: Date ): Promise<[ Status, number?/*cost*/ ]>
        router.route( '/prop/rent' ).put( async ( request, response ) => {
            try
            {
                let session = request.session as Session;
                let prop_id = request.body.prop_id as ObjectId;
                let from_dt = request.body.from_dt as Date;
                let to_dt = request.body.to_dt as Date;
                PropApiCall.ensureValid( session.acc_type, "rent", prop_id, from_dt, to_dt );
                
                let res = await new PropModel( request.session ).rent( prop_id, from_dt, to_dt );
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
            catch( err )
            {
                if     ( err instanceof Status ) console.log( err );
                else if( err instanceof Error  ) console.log( err );
                else                             throw err;
                
                let res = [ new Status().setError( "message", "could not rent property" ) ];
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
        });


        // ------------------------------------------------------------- //
        // PUT    async makePurchaseOffer( prop_id: ObjectId, offered_amount: number ): Promise<Status>
        router.route( '/prop/makePurchaseOffer' ).put( async ( request, response ) => {
            try
            {
                let session = request.session as Session;
                let prop_id = request.body.prop_id as ObjectId;
                let offered_amount = request.body.offered_amount as number;
                PropApiCall.ensureValid( session.acc_type, "makePurchaseOffer", prop_id, offered_amount );
                
                let res = await new PropModel( request.session ).makePurchaseOffer( prop_id, offered_amount );
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
            catch( err )
            {
                if     ( err instanceof Status ) console.log( err );
                else if( err instanceof Error  ) console.log( err );
                else                             throw err;
                
                let res = new Status().setError( "message", "could not make purchase offer on property" );
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
        });

        // PUT   async acceptOrRejectPurchaseOffer( prop_id: ObjectId, offeror_id: ObjectId, accept: boolean ): Promise<Status>
        router.route( '/prop/acceptOrRejectPurchaseOffer' ).put( async ( request, response ) => {
            try
            {
                let session = request.session as Session;
                let prop_id = request.body.prop_id as ObjectId;
                let offeror_id = request.body.offeror_id as ObjectId;
                let accept = request.body.accept as boolean;
                PropApiCall.ensureValid( session.acc_type, "acceptOrRejectPurchaseOffer", prop_id, offeror_id, accept );
                
                let res = await new PropModel( request.session ).acceptOrRejectPurchaseOffer( prop_id, offeror_id, accept );
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
            catch( err )
            {
                if     ( err instanceof Status ) console.log( err );
                else if( err instanceof Error  ) console.log( err );
                else                             throw err;
                
                let res = new Status().setError( "message", "could not make purchase offer on property" );
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
        });

        // POST   async listPurchaseOffers( prop_id: ObjectId ): Promise<[ Status, Array< OfferData >? ]>
        router.route( '/prop/listPurchaseOffers' ).post( async ( request, response ) => {
            try
            {
                let session = request.session as Session;
                let prop_id = request.body.prop_id as ObjectId;
                PropApiCall.ensureValid( session.acc_type, "listPurchaseOffers", prop_id );
                
                let res = await new PropModel( request.session ).listPurchaseOffers( prop_id );
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
            catch( err )
            {
                if     ( err instanceof Status ) console.log( err );
                else if( err instanceof Error  ) console.log( err );
                else                             throw err;
                
                let res = new Status().setError( "message", "could not list purchase offers for property" );
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
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
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
            catch( err )
            {
                if     ( err instanceof Status ) console.log( err );
                else if( err instanceof Error  ) console.log( err );
                else                             throw err;
                
                let res = new Status().setError( "message", "could not get stats for properties" );
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
        });
    }
}

