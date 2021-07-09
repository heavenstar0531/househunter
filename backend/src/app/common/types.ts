// FIXME: implement map interface instead of extension
export class Status extends Map<string, any>
{
    constructor()
    {
        super();
        this.setStatus( "not set" );
        this.setMessage( "not set" );
    }

    setStatus( status: string )
    {
        this.set( "status", status );
    }

    setMessage( message: string )
    {
        this.set( "message", message );
    }
};

// FIXME: implement map interface instead of extension
export class Criteria extends Map<string, any> {};
// FIXME: implement map interface instead of extension
export class Stats extends Map<string, any> {};
