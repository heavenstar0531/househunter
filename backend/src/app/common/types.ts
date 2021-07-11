export class Status
{
    private map: Map<string, any> = new Map<string, any>();
    private status: number = Status.SUCCESS;
    static ERROR:   number = -2;
    static WARNING: number = -1;
    static SUCCESS: number =  0;

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
