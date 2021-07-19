import { Router } from 'express';
import ObjectId from 'bson-objectid';
import { PropApiCall, PropData } from '../common/requests/prop.data';
import { Criteria } from '../common/types';
import { PropModel } from '../models/prop.model';
import { RestApi } from './rest.api';

export class PropApi
{
    static register( router: Router ): void
    {
        // ------------------------------------------------------------- //
        // POST   async add( prop: PropData ): Promise<[ Status, ObjectId?/*prop_id*/ ]>
        router.route( '/prop/add' ).post( async ( request, response ) => {
            try
            {
                let session = request.session;
                let prop = request.body as PropData;
                PropApiCall.ensureValid( session.acc_type, "add", prop );
                
                let res = await new PropModel( request.session ).add( prop );
                RestApi.sendJsonResponse( response, 200, res );
            }
            catch( err )
            {
                RestApi.sendJsonErrorResponse( response, 200, err, "could not add property" );
            }
        });

        // POST   async addMany( prop_list: Array<PropData> ): Promise<[ Status, Array<ObjectId>?/*prop_list*/ ]>
        router.route( '/prop/addMany' ).post( async ( request, response ) => {
            try
            {
                let session = request.session;
                let prop_list = request.body as Array<PropData>;
                PropApiCall.ensureValid( session.acc_type, "addMany", prop_list );
                
                let res = await new PropModel( request.session ).addMany( prop_list );
                RestApi.sendJsonResponse( response, 200, res );
            }
            catch( err )
            {
                RestApi.sendJsonErrorResponse( response, 200, err, "could not add properties from given list" );
            }
        });

        // PUT   async delete( prop_id: ObjectId ): Promise<Status>
        router.route( '/prop/delete' ).put( async ( request, response ) => {
            try
            {
                let session = request.session;
                let prop_id = request.body as ObjectId;
                PropApiCall.ensureValid( session.acc_type, "delete", prop_id );
                
                let res = await new PropModel( request.session ).delete( prop_id );
                RestApi.sendJsonResponse( response, 200, res );
            }
            catch( err )
            {
                RestApi.sendJsonErrorResponse( response, 200, err, "could not delete property" );
            }
        });
        
        // POST   async get( prop_id: ObjectId ): Promise<[ Status, PropData? ]>
        router.route( '/prop/get' ).post( async ( request, response ) => {
            try
            {
                let session = request.session;
                let prop_id = request.body as ObjectId;
                PropApiCall.ensureValid( session.acc_type, "get", prop_id );
                
                let res = await new PropModel( request.session ).get( prop_id );
                RestApi.sendJsonResponse( response, 200, res );
            }
            catch( err )
            {
                RestApi.sendJsonErrorResponse( response, 200, err, "could not get property" );
            }
        });

        // POST   async list( criteria: Criteria ): Promise<[ Status, Array<PropData>? ]>
        router.route( '/prop/list' ).post( async ( request, response ) => {
            try
            {
                let session = request.session;
                let criteria = request.body as Criteria;
                PropApiCall.ensureValid( session.acc_type, "list", criteria );
                
                let res = await new PropModel( request.session ).list( criteria );
                RestApi.sendJsonResponse( response, 200, res );
            }
            catch( err )
            {
                RestApi.sendJsonErrorResponse( response, 200, err, "could not list properties" );
            }
        });


        // ------------------------------------------------------------- //
        // PUT   async updateInfo( updated_prop: PropData ): Promise<Status>
        router.route( '/prop/updateInfo' ).put( async ( request, response ) => {
            try
            {
                let session = request.session;
                let updated_prop = request.body as PropData;
                PropApiCall.ensureValid( session.acc_type, "updateInfo", updated_prop );
                
                let res = await new PropModel( request.session ).updateInfo( updated_prop );
                RestApi.sendJsonResponse( response, 200, res );
            }
            catch( err )
            {
                RestApi.sendJsonErrorResponse( response, 200, err, "could not update property info" );
            }
        });

        // PUT   async updateStatus( updated_prop: PropData ): Promise<Status>
        router.route( '/prop/updateStatus' ).put( async ( request, response ) => {
            try
            {
                let session = request.session;
                let updated_prop = request.body as PropData;
                PropApiCall.ensureValid( session.acc_type, "updateStatus", updated_prop );
                
                let res = await new PropModel( request.session ).updateStatus( updated_prop );
                RestApi.sendJsonResponse( response, 200, res );
            }
            catch( err )
            {
                RestApi.sendJsonErrorResponse( response, 200, err, "could not update property status" );
            }
        });


        // ------------------------------------------------------------- //
        // PUT   async rent( prop_id: ObjectId, from_dt: Date, to_dt: Date ): Promise<[ Status, number?/*cost*/ ]>
        router.route( '/prop/rent' ).put( async ( request, response ) => {
            try
            {
                let session = request.session;
                let prop_id = request.body.prop_id as ObjectId;
                let from_dt = request.body.from_dt as Date;
                let to_dt = request.body.to_dt as Date;
                PropApiCall.ensureValid( session.acc_type, "rent", prop_id, from_dt, to_dt );
                
                let res = await new PropModel( request.session ).rent( prop_id, from_dt, to_dt );
                RestApi.sendJsonResponse( response, 200, res );
            }
            catch( err )
            {
                RestApi.sendJsonErrorResponse( response, 200, err, "could not rent property" );
            }
        });


        // ------------------------------------------------------------- //
        // PUT    async makePurchaseOffer( prop_id: ObjectId, offered_amount: number ): Promise<Status>
        router.route( '/prop/makePurchaseOffer' ).put( async ( request, response ) => {
            try
            {
                let session = request.session;
                let prop_id = request.body.prop_id as ObjectId;
                let offered_amount = request.body.offered_amount as number;
                PropApiCall.ensureValid( session.acc_type, "makePurchaseOffer", prop_id, offered_amount );
                
                let res = await new PropModel( request.session ).makePurchaseOffer( prop_id, offered_amount );
                RestApi.sendJsonResponse( response, 200, res );
            }
            catch( err )
            {
                RestApi.sendJsonErrorResponse( response, 200, err, "could not make purchase offer on property" );
            }
        });

        // PUT   async acceptOrRejectPurchaseOffer( prop_id: ObjectId, offeror_id: ObjectId, accept: boolean ): Promise<Status>
        router.route( '/prop/acceptOrRejectPurchaseOffer' ).put( async ( request, response ) => {
            try
            {
                let session = request.session;
                let prop_id = request.body.prop_id as ObjectId;
                let offeror_id = request.body.offeror_id as ObjectId;
                let accept = request.body.accept as boolean;
                PropApiCall.ensureValid( session.acc_type, "acceptOrRejectPurchaseOffer", prop_id, offeror_id, accept );
                
                let res = await new PropModel( request.session ).acceptOrRejectPurchaseOffer( prop_id, offeror_id, accept );
                RestApi.sendJsonResponse( response, 200, res );
            }
            catch( err )
            {
                RestApi.sendJsonErrorResponse( response, 200, err, "could not make purchase offer on property" );
            }
        });

        // POST   async listPurchaseOffers( prop_id: ObjectId ): Promise<[ Status, Array< OfferData >? ]>
        router.route( '/prop/listPurchaseOffers' ).post( async ( request, response ) => {
            try
            {
                let session = request.session;
                let prop_id = request.body as ObjectId;
                PropApiCall.ensureValid( session.acc_type, "listPurchaseOffers", prop_id );
                
                let res = await new PropModel( request.session ).listPurchaseOffers( prop_id );
                RestApi.sendJsonResponse( response, 200, res );
            }
            catch( err )
            {
                RestApi.sendJsonErrorResponse( response, 200, err, "could not list purchase offers for property" );
            }
        });


        // ------------------------------------------------------------- //
        // POST   async getStats(): Promise<[ Status, Stats? ]>
        router.route( '/prop/getStats' ).post( async ( request, response ) => {
            try
            {
                let session = request.session;
                PropApiCall.ensureValid( session.acc_type, "getStats" );
                
                let res = await new PropModel( request.session ).getStats();
                RestApi.sendJsonResponse( response, 200, res );
            }
            catch( err )
            {
                RestApi.sendJsonErrorResponse( response, 200, err, "could not get stats for properties" );
            }
        });
    }
}

