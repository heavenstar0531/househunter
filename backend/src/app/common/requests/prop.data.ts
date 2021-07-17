import ObjectId from 'bson-objectid';
import { AgncyApiCall } from '../requests/agncy.data';
import { EnsurePermission } from '../permissions';
import { Criteria, Status } from '../types';

export class RentData
{
    // ------------------------------------------------------------- <<< rent info
    renter_id?: ObjectId;   // ->acc
    from_dt?:   Date;       // date
    to_dt?:     Date;       // date


    // FIXME: this validation sort of works, but is not the best
    static validate( status: Status, data: null|RentData, reqfields?: {} ): void
    {
        if( !( data instanceof RentData ) ) { status.setError( "rent.err", "rent data not given" ); return; }
        if( reqfields )
        {
            // --------------
            if( 'renter_id' in reqfields && data.renter_id  === undefined ) { status.setError( "renter_id.err",  "renter id missing" ); return; }
            if( 'from_dt'   in reqfields && data.from_dt    === undefined ) status.setError( "from_dt.err",    "from_dt missing" );
            if( 'to_dt'     in reqfields && data.to_dt      === undefined ) status.setError( "to_dt.err",      "to_dt missing" );
        }
        // ------------------------------------------------------------- <<< rent info
        if( data.renter_id  !== undefined && !data.renter_id ) { status.setError( "renter_id.err",  "renter id missing" ); return; }
        if( data.from_dt    !== undefined && !data.from_dt   ) status.setError( "from_dt.err",    "from date missing" );
        if( data.to_dt      !== undefined && !data.to_dt     ) status.setError( "to_dt.err",      "to date missing" );
    }
};


export class OfferData
{
    // ------------------------------------------------------------- <<< offer info
    offeror_id?:     ObjectId;    // ->acc
    offered_amount?: number;      // number
    accepted_dt?:    null|Date;   // date|null


    // FIXME: this validation sort of works, but is not the best
    static validate( status: Status, data: null|OfferData, reqfields?: {} ): void
    {
        if( !( data instanceof OfferData ) ) { status.setError( "offer.err", "offer data not given" ); return; }
        if( reqfields )
        {
            // --------------
            if( 'offeror_id'     in reqfields && data.offeror_id     === undefined ) { status.setError( "offeror_id.err",     "offeror id missing" ); return; }
            if( 'offered_amount' in reqfields && data.offered_amount === undefined ) status.setError( "offered_amount.err", "offered amount missing" );
            if( 'accepted_dt'    in reqfields && data.accepted_dt    === undefined ) status.setError( "accepted_dt.err",    "accepted date missing" );
        }
        // ------------------------------------------------------------- <<< offer info
        if( data.offeror_id     !== undefined && !data.offeror_id                 ) { status.setError( "offeror_id.err",     "offeror id missing" ); return; }
        if( data.offered_amount !== undefined && ( data.offered_amount ?? -1) < 0 ) status.setError( "offered_amount.err", "offerred amount must be positive" );
    }
};


export class PropData
{
    // ------------------------------------------------------------- <<< property info
    _id?:                 ObjectId;               // [id]
    name?:                string;                 // string
    addr_city?:           string;                 // string|null
    addr_district?:       string;                 // string|null
    addr_street?:         string;                 // string|null
    addr_streetnum?:      string;                 // string|null
    prop_type?:           string;                 // enum( 'house', 'flat' )
    flat_floornum?:       null|number;            // number|null
    floorcnt?:            number;                 // number
    area_m2?:             number;                 // number
    roomcnt?:             number;                 // number
    is_furnished?:        boolean;                // bool
    gallery?:             Array<ObjectId>;        // list< ->file >|list< file >|null     # u objektu se uvek cuva! lista ->file;   photos, gifs and videos
    owner_id?:            ObjectId;               // ->acc|->agncy                        # (usr), agency
    // ------------------------------------------------------------- <<< rent/sale info
    prop_sale_type?:      string;                 // enum( 'rent', 'sale' )
    price?:               number;                 // number|null
    rent_list?:           null|Array<RentData>;   // list< rent >|null
    sale_offer_list?:     null|Array<OfferData>;  // list< sale_offer >|null
    sale_arbiter_id?:     null|ObjectId;          // ->acc|null                           # (agn),(adm) mora da potvrdi prihvacenu ponudu! (ako nije potvrdio, ponuda nije jos prihvacena)
    // ------------------------------------------------------------- <<< property status
    accepted_dt?:         null|Date;              // date|null
    sold_dt?:             null|Date;              // date|null
    deleted_dt?:          null|Date;              // date|null
    is_promoted?:         boolean;                // bool
    viewcnt?:             number;                 // number


    // FIXME: this validation sort of works, but is not the best
    static validate( status: Status, data: null|PropData, reqfields?: {} ): void
    {
        if( !( data instanceof PropData ) ) { status.setError( "prop.err", "property not given" ); return; }
        if( reqfields )
        {
            // --------------
            if( '_id'               in reqfields && data._id               === undefined ) { status.setError( "_id.err",               "property id missing" ); return; }
            if( 'name'              in reqfields && data.name              === undefined ) status.setError( "name.err",              "name missing" );
            if( 'addr_city'         in reqfields && data.addr_city         === undefined ) status.setError( "addr_city.err",         "city missing" );
            if( 'addr_district'     in reqfields && data.addr_district     === undefined ) status.setError( "addr_district.err",     "district missing" );
            if( 'addr_street'       in reqfields && data.addr_street       === undefined ) status.setError( "addr_street.err",       "street missing" );
            if( 'addr_streetnum'    in reqfields && data.addr_streetnum    === undefined ) status.setError( "addr_streetnum.err",    "street number missing" );
            if( 'prop_type'         in reqfields && data.prop_type         === undefined ) status.setError( "prop_type.err",         "property type missing" );
            if( 'flat_floornum'     in reqfields && data.flat_floornum     === undefined ) status.setError( "flat_floornum.err",     "flat's floor number missing" );
            if( 'floorcnt'          in reqfields && data.floorcnt          === undefined ) status.setError( "floorcnt.err",          "number of floors missing" );
            if( 'area_m2'           in reqfields && data.area_m2           === undefined ) status.setError( "area_m2.err",           "area missing" );
            if( 'roomcnt'           in reqfields && data.roomcnt           === undefined ) status.setError( "roomcnt.err",           "number of rooms missing" );
            if( 'is_furnished'      in reqfields && data.is_furnished      === undefined ) status.setError( "is_furnished.err",      "missing if the property is furnished or not" );
            if( 'gallery'           in reqfields && data.gallery           === undefined ) status.setError( "gallery.err",           "gallery missing" );
            if( 'owner_id'          in reqfields && data.owner_id          === undefined ) status.setError( "owner_id.err",          "owner id missing" );
            // --------------
            if( 'prop_sale_type'    in reqfields && data.prop_sale_type    === undefined ) status.setError( "prop_sale_type.err",    "property sale type missing" );
            if( 'price'             in reqfields && data.price             === undefined ) status.setError( "price.err",             "price missing" );
            if( 'rent_list'         in reqfields && data.rent_list         === undefined ) status.setError( "rent_list.err",         "rent list missing" );
            if( 'sale_offer_list'   in reqfields && data.sale_offer_list   === undefined ) status.setError( "sale_offer_list.err",   "sale offer list missing" );
            if( 'sale_arbiter_id'   in reqfields && data.sale_arbiter_id   === undefined ) status.setError( "sale_arbiter_id.err",   "arbiter id missing" );
            // --------------
            if( 'accepted_dt'       in reqfields && data.accepted_dt       === undefined ) status.setError( "accepted_dt.err",       "accepted date missing" );
            if( 'sold_dt'           in reqfields && data.sold_dt           === undefined ) status.setError( "sold_dt.err",           "sold date missing" );
            if( 'deleted_dt'        in reqfields && data.deleted_dt        === undefined ) status.setError( "deleted_dt.err",        "deleted date missing" );
            if( 'is_promoted'       in reqfields && data.is_promoted       === undefined ) status.setError( "is_promoted.err",       "missing if the property is promoted or not" );
            if( 'viewcnt'           in reqfields && data.viewcnt           === undefined ) status.setError( "viewcnt.err",           "view count missing" );
        }
        // ------------------------------------------------------------- <<< property info
        if( data._id   !== undefined && !data._id          ) { status.setError( "_id.err",   "property id missing" ); return; }
        if( data.name  !== undefined && !data.name?.length ) status.setError( "name.err",  "property name missing" );
        
        if( data.addr_city      !== undefined && !data.addr_city?.length      ) status.setError( "addr_city.err",      "city missing" );
        if( data.addr_district  !== undefined && !data.addr_district?.length  ) status.setError( "addr_district.err",  "district missing" );
        if( data.addr_street    !== undefined && !data.addr_street?.length    ) status.setError( "addr_street.err",    "street name missing" );
        if( data.addr_streetnum !== undefined && !data.addr_streetnum?.length ) status.setError( "addr_streetnum.err", "street number missing" );
        
        if( data.prop_type !== undefined && data.prop_type != "house" && data.prop_type != "flat" ) status.setError( "prop_type.err", "invalid property type" );

        if     ( data.prop_type == "flat" && data.flat_floornum === null ) status.setError( "flat_floornum.err", "missing flat's floor number" );
        else if( data.prop_type != "flat" && data.flat_floornum !== null ) status.setError( "flat_floornum.err", "property is not a flat, flat floor number should be null" );
        
        if( data.floorcnt      !== undefined && ( data.floorcnt ?? -1 ) <= 0 ) status.setError( "floorcnt.err",      "floor count has to be positive" );
        if( data.area_m2       !== undefined && ( data.area_m2 ?? -1 ) <= 0  ) status.setError( "area_m2.err",       "area has to be positive" );
        if( data.roomcnt       !== undefined && ( data.roomcnt ?? -1 ) <= 0  ) status.setError( "roomcnt.err",       "the number of rooms has to be positive" );
        if( data.is_furnished  !== undefined && !data.is_furnished           ) status.setError( "is_furnished.err",  "missing if the flat is furnished or not" );
        
        if( data.gallery !== undefined )
        {
            if( !data.gallery ) status.setError( "gallery.err", "missing multimedia gallery" );
            else for( let i = 0; i < data.gallery.length; i++ )
            {
                let media = data.gallery[ i ];
                if( !media )
                {
                    status.setError( "gallery.err", "invalid gallery" );
                    status.setError( "gallery.err.+", "missing media[" + i + "]'s id" );
                    break;
                }
            }
        }
        if( data.owner_id !== undefined && !data.owner_id ) status.setError( "owner_id.err", "owner id missing" );
        // ------------------------------------------------------------- <<< rent/sale info
        if( data.prop_sale_type !== undefined && data.prop_sale_type != "rent" && data.prop_sale_type != "sale" ) status.setError( "prop_sale_type.err", "invalid property sale type" );
        if( data.price          !== undefined && ( data.price ?? -1 ) <= 0  ) status.setError( "price.err", "price has to be positive" );

        if( data.prop_sale_type == "rent" && data.sold_dt ) status.setError( "prop_sale_type.err", "property not for rent, since it is sold/being sold" );

        if( data.rent_list !== undefined )
        {
            if( !data.rent_list ) status.setError( "rent_list.err", "rent list missing" );
            else for( let i = 0; i < data.rent_list.length; i++ )
            {
                let rent = data.rent_list[ i ];
                let rent_status = new Status();
                RentData.validate( rent_status, rent, {
                    renter_id: true,
                    from_dt:   true,
                    to_dt:     true,
                
                } );
                if( rent_status.getStatus() != Status.SUCCESS )
                {
                    status     .setError( "rent_list.err",   "invalid rent list" );
                    rent_status.setError( "rent_list.err.+", { idx: i, status: rent_status } );
                    break;
                }
            }
        }
        if( data.sale_offer_list !== undefined )
        {
            if( !data.sale_offer_list ) status.setError( "sale_offer_list.err", "sale offer list missing" );
            else for( let i = 0; i < data.sale_offer_list.length; i++ )
            {
                let offer = data.sale_offer_list[ i ];
                let sale_status = new Status();
                OfferData.validate( sale_status, offer, {
                    offeror_id:     true,
                    offered_amount: true,
                    accepted_dt:    true,
                } );
                if( sale_status.getStatus() != Status.SUCCESS )
                {
                    status     .setError( "sale_offer_list.err",   "invalid sale offer list" );
                    sale_status.setError( "sale_offer_list.err.+", { idx: i, status: sale_status } );
                    break;
                }
            }
        }

        if( data.owner_id == AgncyApiCall.AgencyId() && data.sold_dt ) status.setError( "owner_id.err",        "agency cannot sell its properties to itself" );
        if( data.sold_dt && data.sale_arbiter_id === null            ) status.setError( "sale_arbiter_id.err", "sale arbiter id missing" );
        if( data.sold_dt === null && data.sale_arbiter_id            ) status.setError( "sold_dt.err",         "missing selling date" );
        // ------------------------------------------------------------- <<< property status
        // data.accepted_dt
        // data.sold_dt
        // data.deleted_dt
        if( data.is_promoted !== undefined && !data.is_promoted           ) status.setError( "is_promoted.err",  "missing if the flat is promoted or not" );
        if( data.viewcnt     !== undefined && ( data.viewcnt ?? -1 ) < 0  ) status.setError( "viewcnt.err",      "view count has to be nonnegative" );
    }
};

export class PropApiCall
{
    static ensureValid( acc_type: string|null, method: string|null, ...params: Array<any> ): void
    {
        EnsurePermission( acc_type, "prop", method );
        let status = new Status();

        switch( method )
        {
            // ------------------------------------------------------------- //
            // + add( prop: PropData )
            case "add":
            {
                let prop = params[ 0 ] as PropData;
                PropData.validate( status, prop, {
                    // --------------
                    name:             true,
                    addr_city:        true,
                    addr_district:    true,
                    addr_street:      true,
                    addr_streetnum:   true,
                    prop_type:        true,
                    flat_floornum:    true,
                    floorcnt:         true,
                    area_m2:          true,
                    roomcnt:          true,
                    is_furnished:     true,
                    gallery:          true,
                    owner_id:         true,
                    // --------------
                    prop_sale_type:   true,
                    price:            true,
                    rent_list:        true,
                    sale_offer_list:  true,
                    sale_arbiter_id:  true,
                    // --------------
                    accepted_dt:      true,
                    sold_dt:          true,
                    deleted_dt:       true,
                    is_promoted:      true,
                    viewcnt:          true,
                } );
                
                break;
            }
            // + addMany( prop_list: Array<PropData> )
            case "addMany":
            {
                let prop_list = params[ 0 ] as Array<PropData>;
                if( !( prop_list instanceof Array ) ) { status.setError( "prop_list.err", "property list missing"); break; }
                
                let i = 0;
                for( i = 0; i < prop_list.length; i++ )
                {
                    let prop = prop_list[ i ];
                    let prop_status = new Status();
                    PropData.validate( prop_status, prop, {
                        // --------------
                        _id:              true,
                        name:             true,
                        addr_city:        true,
                        addr_district:    true,
                        addr_street:      true,
                        addr_streetnum:   true,
                        prop_type:        true,
                        flat_floornum:    true,
                        floorcnt:         true,
                        area_m2:          true,
                        roomcnt:          true,
                        is_furnished:     true,
                        gallery:          true,
                        owner_id:         true,
                        // --------------
                        prop_sale_type:   true,
                        price:            true,
                        rent_list:        true,
                        sale_offer_list:  true,
                        sale_arbiter_id:  true,
                        // --------------
                        accepted_dt:      true,
                        sold_dt:          true,
                        deleted_dt:       true,
                        is_promoted:      true,
                        viewcnt:          true,
                    } );

                    if( prop_status.getStatus() != Status.SUCCESS )
                    {
                        status.setError( "prop_list.err", "invalid property list" );
                        status.setError( "prop_list.err.+", { idx: i, status: prop_status } );
                        break;
                    }
                }

                break;
            }
            // + delete( prop_id: ObjectId )
            case "delete":
            // + get( prop_id: ObjectId )
            case "get":
            {
                let prop_id = params[ 0 ] as ObjectId;
                if( !( prop_id instanceof ObjectId ) ) status.setError( "prop_id.err", "property id missing" );
                break;
            }
            // + list( criteria: Criteria )
            // FIXME: check criteria better
            case "list":
            {
                // <gst>,<all>: <everything>|promoted|city|price_min|price_max;   (usr): owned;   (agn),(adm): agency_owned|sold
                let criteria = params[ 0 ] as Criteria;
                if( !criteria ) break;

                let city:         string  = criteria.get( "city" );
                let price_min:    number  = criteria.get( "price_min" );
                let price_max:    number  = criteria.get( "price_max" );
                let promoted:     boolean = !!criteria.get( "promoted" );
                let unverified:   boolean = !!criteria.get( "unverified" );
                let owned:        boolean = !!criteria.get( "owned" );
                let agency_owned: boolean = !!criteria.get( "agency_owned" );
                let sold:         boolean = !!criteria.get( "sold" );

                let criteria_status = new Status();
                if( acc_type != "usr" )
                {
                    if( owned ) criteria_status.setError( "owned", "invalid criteria" );
                }
                if( acc_type != "adm" && acc_type != "agn" )
                {
                    if( agency_owned ) criteria_status.setError( "agency_owned", "invalid criteria" );
                    if( sold         ) criteria_status.setError( "sold",         "invalid criteria" );
                    if( unverified   ) criteria_status.setError( "unverified",   "invalid criteria" );
                }

                if( criteria_status.getStatus() != Status.SUCCESS ) status.setError( "criteria", criteria_status );
                break;
            }

            // ------------------------------------------------------------- //
            // + updateInfo( updated_prop: PropData )
            case "updateInfo":
            // + updateStatus( updated_prop: PropData )
            case "updateStatus":
            {
                let prop = params[ 0 ] as PropData;
                PropData.validate( status, prop, {
                    // --------------
                    _id:              true,
                    name:             true,
                    addr_city:        true,
                    addr_district:    true,
                    addr_street:      true,
                    addr_streetnum:   true,
                    prop_type:        true,
                    flat_floornum:    true,
                    floorcnt:         true,
                    area_m2:          true,
                    roomcnt:          true,
                    is_furnished:     true,
                    gallery:          true,
                    owner_id:         true,
                    // --------------
                    prop_sale_type:   true,
                    price:            true,
                    rent_list:        true,
                    sale_offer_list:  true,
                    sale_arbiter_id:  true,
                    // --------------
                    accepted_dt:      true,
                    sold_dt:          true,
                    deleted_dt:       true,
                    is_promoted:      true,
                    viewcnt:          true,
                } );
                
                break;
            }

            // ------------------------------------------------------------- //
            // + rent( prop_id: ObjectId, from_dt: Date, to_dt: Date )
            case "rent":
            {
                let prop_id = params[ 0 ] as ObjectId;
                let from_dt = params[ 1 ] as Date;
                let to_dt   = params[ 2 ] as Date;

                if( !( prop_id instanceof ObjectId ) ) status.setError( "prop_id.err", "property id missing" );
                if( !( from_dt instanceof Date )     ) status.setError( "from_dt.err", "from date missing" );
                if( !( to_dt   instanceof Date )     ) status.setError( "to_dt.err",   "to date missing" );
                break;
            }

            // ------------------------------------------------------------- //
            // + makePurchaseOffer( prop_id: ObjectId, offered_amount: number )
            case "makePurchaseOffer":
            {
                let prop_id        = params[ 0 ] as ObjectId;
                let offered_amount = params[ 1 ] as Number;

                if( !( prop_id        instanceof ObjectId ) ) status.setError( "prop_id.err", "property id missing" );
                if( !( offered_amount instanceof Number )   ) status.setError( "from_dt.err", "offered amount missing" );
                break;
            }
            // + acceptOrRejectPurchaseOffer( prop_id: ObjectId, offeror_id: number, accept: boolean )
            case "acceptOrRejectPurchaseOffer":
            {
                let prop_id    = params[ 0 ] as ObjectId;
                let offeror_id = params[ 1 ] as ObjectId;
                let accept     = params[ 2 ] as Boolean;

                if( !( prop_id    instanceof ObjectId ) ) status.setError( "prop_id.err",    "property id missing" );
                if( !( offeror_id instanceof ObjectId ) ) status.setError( "offeror_id.err", "offeror id missing" );
                if( !( accept     instanceof Boolean  ) ) status.setError( "accept.err",     "accept switch missing" );
                break;
            }
            // + listPurchaseOffers( prop_id: ObjectId )
            case "listPurchaseOffers":
            {
                let prop_id = params[ 0 ] as ObjectId;
                if( !( prop_id instanceof ObjectId ) ) status.setError( "prop_id.err", "property id missing" );
                break;
            }

            // ------------------------------------------------------------- //
            // + getStats()
        }

        if( status.getStatus() != Status.SUCCESS ) throw status;
    }
}

