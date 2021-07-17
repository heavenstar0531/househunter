import mongoose, { Model } from 'mongoose';
import { Session } from '../util/types';
import ObjectId from 'bson-objectid';
import { PropData, OfferData, RentData } from '../common/requests/prop.data';
import { Status, Criteria, Stats, CheckIntersection } from '../common/types'
import { AgncyModel } from './agncy.model';

let propRentSchema = new mongoose.Schema({
    // ------------------------------------------------------------- <<< rent info
 // _id:     ObjectId,     // [id]
    renter_id: ObjectId,   // ->acc
    from_dt:   Date,       // date
    to_dt:     Date,       // date
});

let propOfferSchema = new mongoose.Schema({
    // ------------------------------------------------------------- <<< offer info
 // _id:            ObjectId,   // [id]
    offeror_id:     ObjectId,   // ->acc
    offered_amount: Number,     // number
    accepted_dt:    Date,       // date|null
});

let propSchema = new mongoose.Schema({
    // ------------------------------------------------------------- <<< property info
 // _id:                 ObjectId,            // [id]
    name:                String,              // string
    addr_city:           String,              // string|null
    addr_district:       String,              // string|null
    addr_street:         String,              // string|null
    addr_streetnum:      String,              // string|null
    prop_type:           { type: String, enum: [ 'house', 'flat' ] },   // enum( 'house', 'flat' )
    flat_floornum:       Number,              // number|null
    floorcnt:            Number,              // number
    area_m2:             Number,              // number
    roomcnt:             Number,              // number
    is_furnished:        Boolean,             // bool
    gallery:             [ObjectId],          // list< ->file >|list< file >|null    # u objektu se uvek cuva! lista ->file;   photos, gifs and videos
    owner_id:            ObjectId,            // ->acc|->agncy                       # (usr), agency
    // ------------------------------------------------------------- <<< rent/sale info
    prop_sale_type:      { type: String, enum: [ 'rent', 'sale' ] },   // enum( 'rent', 'sale' )
    rent_list:           [propRentSchema],    // list< rent >|null
    rent_price:          Number,              // number|null
    sale_proposed_price: Number,              // number|null
    sale_offer_list:     [propOfferSchema],   // list< sale_offer >|null
    sale_actual_price:   Number,              // number|null
    sale_arbiter_id:     ObjectId,            // ->acc|null                           # (agn),(adm) mora da potvrdi prihvacenu ponudu! (ako nije potvrdio, ponuda nije jos prihvacena)
    // ------------------------------------------------------------- <<< property status
    accepted_dt:         Date,                // date|null
    sold_dt:             Date,                // date|null
    deleted_dt:          Date,                // date|null
    is_promoted:         Boolean,             // bool
    viewcnt:             Number,              // number    
});

export class PropModel
{
    private model: Model<any> = mongoose.model( 'prop', propSchema, 'prop' );

    constructor(
        private session: Session
    ) { }

    // ------------------------------------------------------------- //
    // <all>
    // FIXME: limit what the user can do
    async add( prop: PropData ): Promise<[ Status, ObjectId?/*prop_id*/ ]>
    {
        let status = new Status();
        
        let opres = await this.model.collection.insertOne(
            prop,
        );

        if( opres.result.ok != 1 ) return [ status.setError( "message", "could not add property" ) ];
        return [ status, opres.insertedId ];
    }

    // (adm)
    // FIXME: limit what the user can do
    async addMany( prop_list: Array<PropData> ): Promise<[ Status, Array<ObjectId>?/*prop_list*/ ]>
    {
        let status = new Status();
        
        let opres = await this.model.collection.insertMany(
            prop_list
        );

        if( opres.result.ok != 1 ) return [ status.setError( "message", "could not add properties from given list" ) ];

        let insertedIds = new Array<ObjectId>();
        for( let i = 0; i < opres.result.n; i++ )
        {
            insertedIds.push( opres.insertedIds[ i ] );
        }

        return [ status, insertedIds ];
    }

    // (adm)
    async delete( prop_id: ObjectId ): Promise<Status>
    {
        let status = new Status();
        
        let opres = await this.model.collection.updateOne(
            { _id: prop_id, deleted_dt: null },
            { deleted_dt: { $set: new Date() } }
        );

        if( opres.result.ok != 1 ) return status.setError( "message", "could not delete property" );
        return status;
    }

    // <gst>,<all>
    async get( prop_id: ObjectId ): Promise<[ Status, PropData? ]>
    {
        let status = new Status();
        
        let property = await this.model.findOne(
            { _id: prop_id, deleted_dt: null }
        ).lean().exec() as PropData;

        if( !property ) return [ status.setError( "message", "could not get property" ) ];

        let acc_type = this.session.acc_type ?? "gst";
        let viewed_prop_map = this.session.viewed_prop_map;
        if( acc_type == "usr" && !viewed_prop_map.has( prop_id ) )
        {
            property.viewcnt++;
            let status = await this.updateStatus( property );
            if( status.getStatus() != Status.SUCCESS ) return [ status.setError( "message", "could not update property view count" ) ];
            viewed_prop_map.set( prop_id, true );
        }

        return [ status, property ];
    }

    // <gst>,<all>: <everything>|promoted|city|price_min|price_max;   (usr): owned;   (agn),(adm): agency_owned|sold
    async list( criteria: Criteria ): Promise<[ Status, Array<PropData>? ]>
    {
        let status = new Status();

        let mongo_criteria: any = { deleted_dt: { $eq: null } };
        if( criteria.size == 0 )
        {
            let city:         string  = criteria.get( "city" );
            let price_min:    number  = criteria.get( "price_min" );
            let price_max:    number  = criteria.get( "price_max" );
            let promoted:     boolean = !!criteria.get( "promoted" );
            let unverified:   boolean = !!criteria.get( "unverified" );
            let owned:        boolean = !!criteria.get( "owned" );
            let agency_owned: boolean = !!criteria.get( "agency_owned" );
            let sold:         boolean = !!criteria.get( "sold" );

            if( city ) mongo_criteria.addr_city = { $eq: city };
            if( price_min || price_max )
            {
                price_min = price_min ?? 0;
                price_max = price_max ?? Number.MAX_SAFE_INTEGER;
                mongo_criteria.price = { $gte: price_min, $lte: price_max };
            }

            if( unverified ) mongo_criteria.verified = { $eq: null };
            if( promoted ) mongo_criteria.is_promoted = { $eq: true };
            if( agency_owned )
            {
                mongo_criteria.owner_id = { $eq: AgncyModel.getId() };
            }
            else if( owned )
            {
                mongo_criteria.owner_id = { $eq: this.session.acc_id };
            }

            if( sold )
            {
                mongo_criteria.sold_dt = { $neq: null };
            }
            else
            {
                mongo_criteria.sold_dt = { $eq: null };
            }
        }
        else
        {
            if( this.session.acc_type == "adm" || this.session.acc_type == "agn" )
            {
                mongo_criteria.sale_arbiter_id = { $eq: null };
            }
            else
            {
                mongo_criteria.sold_dt = { $eq: null };
            }
        }
        
        let property_list = await this.model.find(
            mongo_criteria
        ).lean().exec();

        if( !property_list ) return [ status.setError( "message", "could not list properties" ) ];
        return [ status, property_list ];
    }


    // ------------------------------------------------------------- //
    // <all>
    // FIXME: limit what the user can do
    async updateInfo( updated_prop: PropData ): Promise<Status>
    {
        let status = new Status();

        let opres = await this.model.collection.updateOne(
            { _id: updated_prop._id, deleted_dt: null },
            updated_prop
        );

        if( opres.result.ok != 1 ) return status.setError( "message", "could not update property info" );
        return status;
    }

    // (adm),(agn)
    // FIXME: limit what the user can do
    async updateStatus( updated_prop: PropData ): Promise<Status>
    {
        let status = new Status();
        
        let opres = await this.model.collection.updateOne(
            { _id: updated_prop._id, deleted_dt: null },
            updated_prop
        );

        if( opres.result.ok != 1 ) return status.setError( "message", "could not update property status" );
        return status;
    }
    
    
    // ------------------------------------------------------------- //
    // (usr)
    // FIXME: should be atomic in mongo
    async rent( prop_id: ObjectId, from_dt: Date, to_dt: Date ): Promise<[ Status, number?/*cost*/ ]>
    {
        let [ status, prop ] = await this.get( prop_id );
        
        if( status.getStatus() != Status.SUCCESS ) return [ status ];
        if( prop.prop_sale_type != "rent" ) return [ status.setError( "message", "property isn't available for renting" ) ];

        for( let i = 0; i < prop.rent_list.length; i++ )
        {
            let rent: RentData = prop.rent_list[ i ];
            if( CheckIntersection( from_dt.valueOf(), to_dt.valueOf(), rent.from_dt.valueOf(), rent.to_dt.valueOf() ) ) return [ status.setError( "message", "property isn't available for renting between given dates" ) ];
        }

        let rent = new RentData();
        rent.renter_id = this.session.acc_id;
        rent.from_dt = from_dt;
        rent.to_dt = to_dt;

        let opres = await this.model.collection.updateOne(
            { prop_id: prop_id, deleted_dt: null },
            { rent_list: { $push: rent } }
        );

        if( opres.result.ok != 1 ) return [ status.setError( "message", "could not rent property" ) ];
        return [ status, prop.price ];
    }


    // ------------------------------------------------------------- //
    // (usr)
    async makePurchaseOffer( prop_id: ObjectId, offered_amount: number ): Promise<Status>
    {
        let [ status, prop ] = await this.get( prop_id );
        
        if( status.getStatus() != Status.SUCCESS ) return status;
        if( prop.prop_sale_type != "sale" || prop.sold_dt ) return status.setError( "message", "property isn't available for sale" );

        let offer = new OfferData();
        offer.offeror_id = this.session.acc_id;
        offer.offered_amount = offered_amount;

        let opres = await this.model.collection.updateOne(
            { prop_id: prop_id, deleted_dt: null },
            { sale_offer_list: { $push: offer } }
        );

        if( opres.result.ok != 1 ) return status.setError( "message", "could not make purchase offer on property" );
        return status;
    }

    // <all>
    async acceptOrRejectPurchaseOffer( prop_id: ObjectId, offeror_id: ObjectId, accept: boolean ): Promise<Status>
    {
        let [ status, prop ] = await this.get( prop_id );
        
        if( status.getStatus() != Status.SUCCESS ) return new Status().setError( "message", "could not find purchase offer for property" );
        if( prop.prop_sale_type != "sale" ) return status.setError( "message", "property isn't available for sale" );
        if( prop.sale_arbiter_id ) return new Status().setError( "message", "cannot accept/reject purchase offer for sold property" );

        if( accept )
        {
            if( !prop.sold_dt ) prop.sold_dt = new Date();
            if( this.session.acc_type == "adm" || this.session.acc_type == "agn" ) prop.sale_arbiter_id = this.session.acc_id;
            if( prop.sale_arbiter_id ) prop.owner_id = offeror_id;
        }
        else
        {
            prop.sale_offer_list = prop.sale_offer_list.filter( ( offer: OfferData ) => {
                let is_match = offer.offeror_id == offeror_id;
                if( is_match && offer.accepted_dt ) { prop.sold_dt = null; }
                return is_match;
            } );
        }
        
        let opres = await this.model.collection.updateOne(
            { prop_id: prop_id, deleted_dt: null },
            prop
        );

        if( opres.result.ok != 1 ) return status.setError( "message", "could not accept/reject purchase offer for property" );
        return status;
    }

    // <all>
    async listPurchaseOffers( prop_id: ObjectId ): Promise<[ Status, Array< OfferData >? ]>
    {
        let [ status, prop ] = await this.get( prop_id );
        if( status.getStatus() != Status.SUCCESS ) return [ new Status().setError( "message", "could not find purchase offers for property" ) ];
        
        if( prop.prop_sale_type != "sale" || prop.sold_dt ) return [ new Status().setError( "message", "property isn't available for sale" ) ];

        let offer_list = new Array<OfferData>();
        for( let i = 0; i < prop.sale_offer_list.length; i++ )
        {
            let offer = prop.sale_offer_list[ i ];
            offer_list.push( offer );
        }

        return [ status, offer_list ];
    }
    
    
    // ------------------------------------------------------------- //
    // (adm),(agn)
    async getStats(): Promise<[ Status, Stats? ]>
    {
        let [ status, agency ] = await new AgncyModel( this.session ).get();
        if( !agency ) return [ status.setError( "message", "could not get agency info for calculating properties' stats" ) ];
        
        let property_list = await this.model.find(
            { accepted_dt: { $neq: null }, deleted_dt: { $eq: null } }
        ).lean().exec() as Array<PropData>;

        if( !property_list ) return [ status.setError( "message", "could not get properties for calculating properties' stats" ) ];

        // graph 1
        let price_range: any = {
            "<= 2500":   0,
            "<= 5000":   0,
            "<= 10000":  0,
            "<= 20000":  0,
            "<= 50000":  0,
            "<= 100000": 0,
            "<= 200000": 0,
            "> 200000":  0,
        };
        // graph 2
        let cities: any = {};
        // graph 3
        let houses: any = { "rent": 0, "sale": 0 };
        // graph 4
        let flats: any = { "rent": 0, "sale": 0 };
        // graph 5
        let profit: any = { "rent": 0, "sale": 0 };

        for( let prop of property_list )
        {
            // graph 1
            if     ( prop.price <= 2500   ) price_range[ "<= 2500"   ]++;
            else if( prop.price <= 5000   ) price_range[ "<= 5000"   ]++;
            else if( prop.price <= 10000  ) price_range[ "<= 10000"  ]++;
            else if( prop.price <= 20000  ) price_range[ "<= 20000"  ]++;
            else if( prop.price <= 50000  ) price_range[ "<= 50000"  ]++;
            else if( prop.price <= 100000 ) price_range[ "<= 100000" ]++;
            else if( prop.price <= 200000 ) price_range[ "<= 200000" ]++;
            else                            price_range[ "> 200000"  ]++;

            // graph 2
            cities[ prop.addr_city ] = ( cities[ prop.addr_city ] ?? 0 ) + 1;
            // graph 3
            houses[ prop.prop_sale_type ]++;
            // graph 4
            flats[ prop.prop_sale_type ]++;
            // graph 5
            profit[ prop.prop_sale_type ] += agency.rent_percent/100;
        }
        profit[ "rent" ] *= agency.rent_percent/100;
        profit[ "sale" ] *= agency.sale_percent/100;

        let stats = new Stats();
        stats.set( "price_range", price_range );
        stats.set( "cities",      cities );
        stats.set( "houses",      houses );
        stats.set( "flats",       flats );
        stats.set( "profit",      profit );

        return [ status, stats ];
    }
}

