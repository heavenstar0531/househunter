export class Status
{
    private map: any = {};
    private status: number = Status.SUCCESS;
    static readonly ERROR:   number = -2;
    static readonly WARNING: number = -1;
    static readonly SUCCESS: number =  0;

    constructor() {}
    
    getStatus(): number { return this.status; }
    getKey( key: string ): any { return this.map[ key ]; }
    
    private setStatus( status: number ): Status
    {
        this.status = Math.min( this.status, status );
        return this;
    }

    private setKey( key: string, value: any ): void { this.map[ key ] = value; }

    setError  ( key: string, value: any ): Status { this.setStatus( Status.ERROR   ); this.setKey( key, value ); return this; }
    setWarning( key: string, value: any ): Status { this.setStatus( Status.WARNING ); this.setKey( key, value ); return this; }
    setInfo   ( key: string, value: any ): Status { this.setStatus( Status.SUCCESS ); this.setKey( key, value ); return this; }
};

export class Criteria
{
    private map: any = {};
    get( key: string ): any { return this.map[ key ]; }
    set( key: string, value: any ): Criteria { this.map[ key ] = value; return this; }
    has( key: string ): boolean { return !!this.map[ key ]; }
    get size(): number { return Object.keys( this.map ).length; }
};

export class Stats
{
    private map: any = {};
    get( key: string ): any { return this.map[ key ]; }
    set( key: string, value: any ): Stats { this.map[ key ] = value; return this; }
    has( key: string ): boolean { return !!this.map[ key ]; }
    get size(): number { return Object.keys( this.map ).length; }
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

