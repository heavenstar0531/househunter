export class Status
{
    private map: Map<string, any> = new Map<string, any>();
    private status: number = Status.SUCCESS;
    static readonly ERROR:   number = -2;
    static readonly WARNING: number = -1;
    static readonly SUCCESS: number =  0;

    constructor() {}
    
    getStatus(): number { return this.status; }
    getKey( key: string ): any { return this.map.get( key ); }
    getKeys(): IterableIterator<string> { return this.map.keys(); }
    
    private setStatus( status: number ): Status
    {
        this.status = Math.min( this.status, status );
        return this;
    }

    setError( key: string, value: any ): Status { this.setStatus( Status.ERROR ); this.map.set( key, value ); return this; }
    setWarning( key: string, value: any ): Status { this.setStatus( Status.WARNING ); this.map.set( key, value ); return this; }
    setInfo( key: string, value: any ): Status { this.setStatus( Status.SUCCESS ); this.map.set( key, value ); return this; }
};

// FIXME: these classes should not extend map but contain it
export class Criteria extends Map<string, any> {};
export class Stats extends Map<string, any> {};

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

