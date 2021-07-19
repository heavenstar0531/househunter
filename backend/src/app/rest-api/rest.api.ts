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


    public static sendJsonErrorResponse( response: any, status: number, error: any, message: string ): void
    {
        console.log( error );
    
        if( !( error instanceof Status ) ) error = new Status();
        error.setError( "message", message );

        response.status( status ).type( "application/json" ).send( JSON.stringify( error, JsonStringifyReplacer ) );
        if( error instanceof Status || error instanceof Error ) return;
        throw error;
    }

    public static sendFileErrorResponse( response: any, error: any ): void
    {
        console.log( error );

        response.status( 400 ).send( "" );
        if( error instanceof Status || error instanceof Error ) return;
        throw error;
    }
}


