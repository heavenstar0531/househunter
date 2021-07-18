import ObjectId from "bson-objectid";

export class Status
{
    private map: Map<string, any> = new Map<string, any>();
    private status: number = Status.SUCCESS;
    static readonly ERROR:   number = -2;
    static readonly WARNING: number = -1;
    static readonly SUCCESS: number =  0;

    constructor() {}

    *[ Symbol.iterator ] (): any
    {
        for( let key in this )
        {
            yield [ key, this[ key ] ];
        }
    };

    getStatus(): number { return this.status; }
    getKey( key: string ): any { return this.map.get( key ); }
    hasKey( key: string ): boolean { return this.map.has( key ); }
    
    private setStatus( status: number ): Status
    {
        this.status = Math.min( this.status, status );
        return this;
    }

    private setKey( key: string, value: any ): void { this.map.set( key, value ); }

    setError  ( key: string, value: any ): Status { this.setStatus( Status.ERROR   ); this.setKey( key, value ); return this; }
    setWarning( key: string, value: any ): Status { this.setStatus( Status.WARNING ); this.setKey( key, value ); return this; }
    setInfo   ( key: string, value: any ): Status { this.setStatus( Status.SUCCESS ); this.setKey( key, value ); return this; }
};

export class Criteria
{
    private map: Map<string, any> = new Map<string, any>();

    *[ Symbol.iterator ] (): any
    {
        for( let key in this )
        {
            yield [ key, this[ key ] ];
        }
    };
    
    get( key: string ): any { return this.map.get( key ); }
    set( key: string, value: any ): Criteria { this.map.set( key, value ); return this; }
    has( key: string ): boolean { return this.map.has( key ); }
    get size(): number { return this.map.size; }
};

export class Stats
{
    private map: Map<string, any> = new Map<string, any>();

    *[ Symbol.iterator ] (): any
    {
        for( let key in this )
        {
            yield [ key, this[ key ] ];
        }
    };

    get( key: string ): any { return this.map.get( key ); }
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
    JsonStringifyReplacer( key: any ): any {
        // @ts-ignore @ts-expect-error
        let val: any = this[ key ];
        
        return val ===  Infinity        ? { $num:   1 }:
               val === -Infinity        ? { $num:  -1 }:
               Number.isNaN( val )      ? { $num: ' ' }:
               // @ts-expect-error
               val instanceof Date      ? { $date: isNaN( val ) ? '!' : +val }:
               val instanceof Map       ? { $map: [ ...val ] }:
               val instanceof Set       ? { $set: [ ...val ] }:
               val instanceof TypeError ? { $type_err: [ val.message, val.stack ] }:
               val instanceof Error     ? { $err: [ val.message, val.stack ] }:
               val instanceof RegExp    ? { $regexp: [ val.source,  val.flags ] }:
               val instanceof ObjectId  ? { $bson_id: val.toHexString() }:
         //    // @ts-expect-error
         //    ArrayBuffer.isView( val ) || val instanceof ArrayBuffer ? { $buf: [ types.indexOf( val.constructor ), buf64.encode( new Uint8Array( val.buffer ) ) ] }:
               typeof val === 'bigint'  ? { $bigint: val + '' }:
               val instanceof Status    ? { $status:   Object.setPrototypeOf( val, null ) || val }:
               val instanceof Criteria  ? { $criteria: Object.setPrototypeOf( val, null ) || val }:
               val instanceof Stats     ? { $stats:    Object.setPrototypeOf( val, null ) || val }:
               val
    },
    JsonParseReviver: ( key: any, val: any ) => {
        return ( val === null && val !== 'object' ) ? val:
            val.$num      ? val.$num / 0:
            val.$date     ? new Date( val.$date ):
            // @ts-expect-error
            val.$regexp   ? new RegExp( ...val.$regexp ):
            val.$err      ? ( key = new Error( val.$err[ 0 ] ), key.stack = val.$err[ 1 ], key ):
            val.$type_err ? ( key = new TypeError( val.$type_err[ 0 ] ), key.stack = val.$type_err[ 1 ], key ):
            val.$map      ? new Map( val.$map ):
            val.$bson_id  ? ObjectId.createFromHexString( val.$bson_id ):
            val.$set      ? new Set( val.$set ):
         // val.$buf      ? val.$buf[ 0 ]
         //               ? new types[ val.$buf[ 0 ] ]( buf64.decode( val.$buf[ 1 ], types[ val.$buf[ 0 ] ].BYTES_PER_ELEMENT ).buffer ):
         //                 new Uint8Array( buf64.decode( val.$buf[ 1 ], 1 ) ).buffer:
            val.$bigint   ? BigInt( val.$bigint ):
            val.$status   ? Object.assign( new Status(),   val.$status   ):
            val.$criteria ? Object.assign( new Criteria(), val.$criteria ):
            val.$stats    ? Object.assign( new Stats(),    val.$stats    ):
            val 
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

