import ObjectId from "bson-objectid";

export class Status
{
    private status: number = Status.SUCCESS;
    private map: Map<string, any> = new Map<string, any>();
    static readonly ERROR:   number = -2;
    static readonly WARNING: number = -1;
    static readonly SUCCESS: number =  0;

    constructor( [ status, map ]: [ number, Map<string, any> ] = [ 0, new Map<string, any>() ] )
    {
        this.status = status;
        this.map = map ? map : new Map<string, any>();
    }

    getStatus(): number { return this.status; }
    getMap(): Map<string, any> { return this.map; }
    getKey( key: string ): any { return this.map.get( key ); }
    hasKey( key: string ): boolean { return this.map.has( key ); }
    
    private setStatus( status: number ): Status
    {
        this.status = Math.min( this.status, status );
        return this;
    }

    private setKey( key: string, value: any, status: number ): void
    {
        if( value === undefined || value === null ) return;
        this.setStatus( status );
        this.map.set( key, value );
    }

    setError  ( key: string, value: any ): Status { this.setKey( key, value, Status.ERROR   ); return this; }
    setWarning( key: string, value: any ): Status { this.setKey( key, value, Status.WARNING ); return this; }
    setInfo   ( key: string, value: any ): Status { this.setKey( key, value, Status.SUCCESS ); return this; }
};

export class Criteria
{
    private map: Map<string, any>;

    constructor( map?: Map<string, any> )
    {
        this.map = map ? map : new Map<string, any>();
    }
    
    *[ Symbol.iterator ] (): any
    {
        for( let key in this )
        {
            yield [ key, this[ key ] ];
        }
    };

    get( key: string ): any { return this.map.get( key ); }
    getMap(): Map<string, any> { return this.map; }
    set( key: string, value: any ): Criteria { this.map.set( key, value ); return this; }
    has( key: string ): boolean { return this.map.has( key ); }
    get size(): number { return this.map.size; }
};

export class Stats
{
    private map: Map<string, any> = new Map<string, any>();

    constructor( map?: Map<string, any> )
    {
        this.map = map ? map : new Map<string, any>();
    }

    *[ Symbol.iterator ] (): any
    {
        for( let key in this )
        {
            yield [ key, this[ key ] ];
        }
    };

    get( key: string ): any { return this.map.get( key ); }
    getMap(): Map<string, any> { return this.map; }
    set( key: string, value: any ): Stats { this.map.set( key, value ); return this; }
    has( key: string ): boolean { return this.map.has( key ); }
    get size(): number { return this.map.size; }
};



// rfc 5822
export const emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;

export const oneLowercaseRegex  = /[a-z]/;
export const oneUppercaseRegex  = /[A-Z]/;
export const oneSpecialRegex    = /[!@#\$%\^\&*\)\(+=._-]/;
export const oneDigitRegex      = /[0-9]/;
export const minFourInASequence = /(.)\1\1\1/;

// check if two intervals intersect
// + don't count single point intersection
export function CheckIntersection( A1: number, A2: number, B1: number, B2: number ): boolean
{
    return Math.max( A2, B2 ) - Math.min( A1, B1 ) > A2-A1 + B2-B1;
}

// cut the given keys from the object
// http://perfectionkills.com/understanding-delete/
export function CutObject( obj: any, keys_to_keep: any ): void
{
    for( let key in obj )
    {
        if( key in keys_to_keep ) delete obj[ key ];
    }
}

// check if the object contains all of the given keys
export function CheckIfObjectContainsKeys( obj: any, keys_to_keep: any ): boolean
{
    for( let key in obj )
    {
        if( !( key in keys_to_keep ) ) return false;
    }
    return true;
}


// https://gist.github.com/jimmywarting/a6ae45a9f445ca352ed62374a2855ff2
export const { JsonStringifyReplacer, JsonParseReviver } = ( ( types: any, buf64: any ) => ( {
    JsonStringifyReplacer( key: any ): any
    {
        // @ts-ignore @ts-expect-error
        let val: any = this[ key ];
        
        if( val ===  null                 ) return val;
        if( val ===  Infinity             ) return { $num:   1 };
        if( val === -Infinity             ) return { $num:  -1 };
        if( Number.isNaN( val )           ) return { $num: ' ' };
        // @ts-expect-error
        if( val instanceof Date           ) return { $date: isNaN( val ) ? '!' : +val };
        if( val instanceof Map            ) return { $map: [ ...val ] };
        if( val instanceof Set            ) return { $set: [ ...val ] };
        if( val instanceof TypeError      ) return { $type_err: [ val.message, val.stack ] };
        if( val instanceof Error          ) return { $err: [ val.message, val.stack ] };
        if( val instanceof RegExp         ) return { $regexp: [ val.source,  val.flags ] };
        if( val instanceof ObjectId       ) return { $bson_id: val.toHexString() };
        if( val?._bsontype === "ObjectID" ) return { $bson_id: val.toHexString() };
        // @ts-expect-error
        if( ArrayBuffer.isView( val ) || val instanceof ArrayBuffer ) return { $buffer: [ types.indexOf( val.constructor ), buf64.encode( new Uint8Array( val.buffer ) ) ] };
        if( typeof val === 'bigint'       ) return { $bigint: val + '' };
        if( val instanceof Status         ) return { $status:   [ val.getStatus(), val.getMap() ] };
        if( val instanceof Criteria       ) return { $criteria: [ val.getMap() ] };
        if( val instanceof Stats          ) return { $stats:    [ val.getMap() ] };
        
        return val
    },
    JsonParseReviver( key: any, val: any ): any
    {
        if( val === null && val !== 'object' ) return val;
        if( val.$num      ) return val.$num / 0;
        if( val.$date     ) return new Date( val.$date );
        // @ts-expect-error
        if( val.$regexp   ) return new RegExp( ...val.$regexp );
        if( val.$err      ) return ( key = new Error( val.$err[ 0 ] ), key.stack = val.$err[ 1 ], key );
        if( val.$type_err ) return ( key = new TypeError( val.$type_err[ 0 ] ), key.stack = val.$type_err[ 1 ], key );
        if( val.$map      ) return new Map( val.$map );
        if( val.$bson_id  ) return ObjectId.createFromHexString( val.$bson_id );
        if( val.$set      ) return new Set( val.$set );
        if( val.$buffer   )
        {
            let buftype = val.$buffer[ 0 ];
            let buffer  = val.$buffer[ 1 ];
            if( buftype ) return new types[ buftype ]( buf64.decode( buffer, types[ buftype ].BYTES_PER_ELEMENT ).buffer );
            else          return new Uint8Array( buf64.decode( buffer, 1 ) ).buffer;
        }
        if( val.$bigint   ) return BigInt( val.$bigint );
        if( val.$status   ) return new Status( val.$status );
        if( val.$criteria ) return new Criteria( val.$criteria );
        if( val.$stats    ) return new Stats( val.$stats );

        return val ;
    },
}) )
// FIXME: garbled mess, fix
(
    [ArrayBuffer, Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array], (()=>{var f=[65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,48,49,50,51,52,53,54,55,56,57,45,95,61],h=[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,62,null,62,null,63,52,53,54,55,56,57,58,59,60,
    // @ts-expect-error
    61,null,null,null,64,null,null,null,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,null,null,null,null,63,null,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,null,null];return{decode(a,bytesper){ var b=a.length%4;b&&(a+=Array(5-b).join("="));b=-1;var l=a.length/4*3; l = l - l%bytesper; var f=new ArrayBuffer(l),d,e=new Uint8Array(f),c=0;for(d=a.length;++b<d;){var g=h[a.charCodeAt(b)],k=h[a.charCodeAt(++b)];e[c++]=g<<2|k>>4;g=h[a.charCodeAt(++b)];if(64===g)break;e[c++]=(k&15)<<
    // @ts-expect-error
    4|g>>2;k=h[a.charCodeAt(++b)];if(64===k)break;e[c++]=(g&3)<<6|k} return new Uint8Array(f,0,c)},encode(a){for(var b=-1,h=a.length,d=new Uint8Array(new ArrayBuffer(Math.ceil(4*h/3))),e=0;++b<h;){var c=a[b],g=a[++b];d[e++]=f[c>>2];d[e++]=f[(c&3)<<4|g>>4];isNaN(g)?(d[e++]=f[64],d[e++]=f[64]):(c=a[++b],d[e++]=f[(g&15)<<2|c>>6],d[e++]=f[isNaN(c)?64:c&63])}return new TextDecoder().decode(d)}}}
) () );


// TEST: json replacer and reviver
// let obj: any =
// {
//     date: new Date(),
//     pInf: Infinity,
//     arr: [2,3],
//     nInf: -Infinity,
//     map: new Map([['a', 'b']]),
//     set: new Set(['a', new Date(), 'a']),
//     reg: /^f/g,
//     err: new Error('fail'),
//     typo: new TypeError('typo'),
//     empty: null,
//     binary: new Uint16Array([97]),
//     buff: new ArrayBuffer(20),
//     obj: {bday: new Date('1996-08-29')},
//     str: 'str',
//     bool: true,
//     num: 3,
//     nan: NaN,
//     invDate: new Date('!'),
//     // Experimental... creating blob/files are sync but reading it is async.
//     file: {$f: [[new Uint8Array([97])], 'sample.txt', {type: 'text/javascript'}]},
//     blob: {$d: [['abc'], {type: 'text/javascript'}]},
//     status: new Status().setError("err", "errrror"),
//     criteria: new Criteria().set("err", "errrror"),
//     stats: new Stats().set("err", "errrror"),
// }

// let str = JSON.stringify( obj, JsonStringifyReplacer, 2 )
// let res = JSON.parse( str, JsonParseReviver )

// console.log( str )
// console.log( obj )
// console.log( res )

