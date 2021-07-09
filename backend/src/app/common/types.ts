// FIXME: these classes should not extend map but implement it
export class Status extends Map<string, any>
{
    constructor( status: string = null, message: string = null )
    {
        super();
        if( status ) this.setStatus( status );
        if( message ) this.setMessage( message );
    }


    getStatus(): any { return this.get( "status" ); }
    getMessage(): any { this.get( "message" ); }

    setStatus( status: string ): void { this.set( "status", status ); }
    setMessage( message: string ): void { this.set( "message", message ); }

    
    mergeWith( status: Status ): void
    {
        status?.forEach( ( value, key ) =>
        {
            if( !this.has( key ) )
            {
                this.set( key, value );
            }
        });
    }
    overwriteWith( status: Status ): void
    {
        status?.forEach( ( value, key ) =>
        {
            this.set( key, value );
        });
    }

};

export class Criteria extends Map<string, any> {};
export class Stats extends Map<string, any> {};
