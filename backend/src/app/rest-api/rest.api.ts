import { JsonStringifyReplacer, Status } from "../common/types";
import { Error } from 'mongoose';
import { FileData } from "../common/requests/file.data";

export class RestApi
{
    public static sendJsonResponse( response: any, status: number, result: any ): void
    {
        response.status( status ).type( "application/json" ).send( JSON.stringify( result, JsonStringifyReplacer ) );
    }
    
    public static sendFileResponse( response: any, status: Status, file: FileData ): void
    {
        if( status.getStatus() != Status.SUCCESS || !file ) { response.status( 400 ); return; }
                
        if( file?.content_type ) response.setHeader( "Content-Type", file?.content_type );
        response.status( 200 ).send( file.data );
    }


    public static sendJsonErrorResponse( response: any, status: number, err: any, message: string ): void
    {
        console.log( err );
    
        let res;
        if     ( err instanceof Status ) res = err;
        else if( err instanceof Error  ) res = new Status().setError( "message", message );
        else                             throw err;
        
        response.status( status ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
    }

    public static sendFileErrorResponse( response: any, err: any ): void
    {
        console.log( err );

        let status;
        if     ( err instanceof Status ) status = 400;
        else if( err instanceof Error  ) status = 400;
        else                             throw err;
        
        response.status( status ).send( "" );
    }
}


